package projekt.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import projekt.domain.Korisnik;
import projekt.domain.Uloga;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;

@Component
public class JwtTokenBuilder {
    private static String secret;

    public static String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public static Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public static <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    public static Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    private static boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    public static String generateToken(Korisnik korisnik) {
        Map<String, Object> claims = new HashMap<>();
        Uloga uloga = korisnik.getUloga();

        claims.put("korisnickoIme", korisnik.getKorisnickoIme());
        claims.put("uloga", uloga);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(korisnik.getKorisnickoIme())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 24L * 60 * 60 * 1000))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public static boolean validateToken(String token, UserDetails userDetails) {
        final String korisnickoIme = getUsernameFromToken(token);
        return korisnickoIme.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }


    public synchronized void setSecret() {
        secret = "J_=2.e#rW*jt\\FR.J9-@,6Y9*)`C#cdc";
    }
}
