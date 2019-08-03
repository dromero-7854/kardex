package tecso.coop.kardex.web;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tecso.coop.kardex.domain.Product;
import tecso.coop.kardex.service.ProductService;

@RestController
@CrossOrigin
@RequestMapping("/kardex-api")
public class ProductController {

	private final Logger log = LoggerFactory.getLogger(ProductController.class);

	@Autowired
	private ProductService productService;

	@PostMapping("/products")
	public ResponseEntity<Product> create(@Valid @RequestBody Product product) throws URISyntaxException {
		log.debug("REST request to save Product : {}", product);
		Product newProduct = productService.createProduct(product);
		return ResponseEntity.created(new URI("/kardex-api/products/" + newProduct.getId())).body(newProduct);
	}

	@GetMapping("/products")
	public ResponseEntity<List<Product>> getAllProducts() {
		List<Product> products = productService.getAllProducts();
		return new ResponseEntity<>(products, HttpStatus.OK);
	}

	@DeleteMapping("/products/{productId}")
	public ResponseEntity<Void> delete(@PathVariable Long productId) {
		productService.deleteProduct(productId);
		return ResponseEntity.ok().build();
	}

	@PutMapping("/products")
	public ResponseEntity<Product> update(@Valid @RequestBody Product product) throws URISyntaxException {
		Product updatedProduct = productService.updateProduct(product);
		return ResponseEntity.accepted().body(updatedProduct);
	}

	@PutMapping("/products/{productId}/increase/{value}")
	public ResponseEntity<Product> increaseStock(@PathVariable Long productId, @PathVariable Integer value)
			throws URISyntaxException {
		Product product = productService.increaseStock(productId, value);
		return ResponseEntity.accepted().body(product);
	}

	@PutMapping("/products/{productId}/decrease/{value}")
	public ResponseEntity<Product> decreaseStock(@PathVariable Long productId, @PathVariable Integer value)
			throws URISyntaxException {
		Product product = productService.decreaseStock(productId, value);
		return ResponseEntity.accepted().body(product);
	}

}
