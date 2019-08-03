package tecso.coop.kardex.error;

public class DuplicatedProductCodeException extends RuntimeException {

	private static final long serialVersionUID = 6646672317512520395L;
	
	public DuplicatedProductCodeException(String code) {
		super("Ya existe un producto con el código " + code);
	}

}
