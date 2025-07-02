package cl.ucm.bookapi.ApiBook.security;

import cl.ucm.bookapi.ApiBook.repository.UserRepository;
import cl.ucm.bookapi.ApiBook.repository.UserRolRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRolRepository userRolRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        String email = null;
        String token = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);

            try {
                email = jwtUtil.extractEmail(token);
            } catch (ExpiredJwtException e) {
                System.out.println("Token expirado");
            } catch (Exception e) {
                System.out.println("Token inválido");
            }
        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            var user = userRepository.findById(email);

            if (user.isPresent() && jwtUtil.isTokenValid(token)) {

                List<SimpleGrantedAuthority> authorities = userRolRepository.findByUserFk(email)
                        .stream()
                        .map(rol -> new SimpleGrantedAuthority(rol.getRolEntity().getName()))
                        .collect(Collectors.toList());

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                user.get(), null, authorities);

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
