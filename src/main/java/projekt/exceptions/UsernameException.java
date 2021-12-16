package projekt.exceptions;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class UsernameException extends RuntimeException{
    public UsernameException(String message) {
        super(message);
    }

    public UsernameException(String message, Throwable cause) {
        super(message, cause);
    }

    public UsernameException(Throwable cause) {
        super(cause);
    }
}
