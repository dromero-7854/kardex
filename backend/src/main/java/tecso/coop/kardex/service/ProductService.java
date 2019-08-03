package tecso.coop.kardex.service;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import tecso.coop.kardex.domain.Product;
import tecso.coop.kardex.error.DuplicatedProductCodeException;
import tecso.coop.kardex.error.ProductNotFoundException;
import tecso.coop.kardex.repository.ProductRepository;

@Service
@Transactional
public class ProductService {

	private final Logger log = LoggerFactory.getLogger(ProductService.class);

	@Autowired
	private ProductRepository productRepository;

	@Transactional(readOnly = false)
	public Product createProduct(Product product) {
		if (productRepository.findByCodeOrderById(product.getCode()).size() > 0) {
			throw new DuplicatedProductCodeException(product.getCode());
		}
		product.setId(null);
		productRepository.save(product);
		log.debug("Created Information for Product: {}", product);
		return product;
	}

	@Transactional(readOnly = false)
	public Product updateProduct(Product product) {
		if (product.getId() == null)
			throw new ProductNotFoundException(product.getId());
		Product dbProduct = productRepository.findById(product.getId())
				.orElseThrow(() -> new ProductNotFoundException(product.getId()));
		if (productRepository.findByCodeOrderById(product.getCode()).stream()
				.filter(prod -> prod.getId() != product.getId()).collect(Collectors.toList()).size() > 0)
			throw new DuplicatedProductCodeException(product.getCode());
		dbProduct.setCode(product.getCode());
		dbProduct.setDescription(product.getDescription());
		dbProduct.setStock(product.getStock());
		productRepository.save(dbProduct);
		log.debug("Created Information for Product: {}", product);
		return product;
	}

	@Transactional(readOnly = true)
	public List<Product> getAllProducts() {
		return productRepository.findAll().stream().collect(Collectors.toList());
	}

	@Transactional(readOnly = false)
	public Product deleteProduct(Long productId) {
		Product product = new Product();
		product.setId(productId);
		productRepository.delete(product);
		return product;
	}

	@Transactional(readOnly = false)
	public Product increaseStock(Long productId, Integer value) {
		Product dbProduct = productRepository.findById(productId)
				.orElseThrow(() -> new ProductNotFoundException(productId));
		dbProduct.setStock(dbProduct.getStock() + value);
		productRepository.save(dbProduct);
		return dbProduct;
	}

	@Transactional(readOnly = false)
	public Product decreaseStock(Long productId, Integer value) {
		Product dbProduct = productRepository.findById(productId)
				.orElseThrow(() -> new ProductNotFoundException(productId));
		dbProduct.setStock((dbProduct.getStock() >= value) ? dbProduct.getStock() - value : 0);
		productRepository.save(dbProduct);
		return dbProduct;
	}

}
