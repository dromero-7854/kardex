package tecso.coop.kardex.error;

public class ProductNotFoundException extends RuntimeException {

	private static final long serialVersionUID = -4155333414213401778L;

	public ProductNotFoundException(Long id) {
		super("Producto no encontrado - id " + id);
	}

}
