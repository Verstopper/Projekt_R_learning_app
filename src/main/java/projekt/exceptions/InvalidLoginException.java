package projekt.exceptions;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class InvalidLoginException extends RuntimeException{
    public InvalidLoginException(String message) {
        super(message);
    }

    public InvalidLoginException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidLoginException(Throwable cause) {
        super(cause);
    }
}
