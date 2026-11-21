package org.example.tradex_backend.auth.security;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class JwtService {

    private final JwtEncoder jwtEncoder;
    private final String issuer;
    @Getter
    private final long accessTokenTtlSeconds;

    public JwtService(JwtEncoder jwtEncoder,
                      @Value("${app.jwt.issuer}")String issuer,
                      @Value("${app.jwt.access-token-ttl-seconds}") long accessTokenTtlSeconds) {
        this.jwtEncoder = jwtEncoder;
        this.issuer = issuer;
        this.accessTokenTtlSeconds = accessTokenTtlSeconds;
    }

    public String generateAccessToken(UserPrincipal principal){

        Instant now = Instant.now();

        List<String> roles = principal.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer(issuer)
                .issuedAt(now)
                .expiresAt(now.plusSeconds(accessTokenTtlSeconds))
                .subject(principal.getId().toString())
                .claim("email", principal.getEmail())
                .claim("roles", roles)
                .build();

        JwsHeader headers = JwsHeader
                .with(MacAlgorithm.HS256)
                .build();

        return jwtEncoder
                .encode(JwtEncoderParameters.from(headers, claims))
                .getTokenValue();

    }


}

