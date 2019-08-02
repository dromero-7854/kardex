package tecso.coop.kardex.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import tecso.coop.kardex.domain.Product;
import tecso.coop.kardex.repository.ProductRepository;
import tecso.coop.kardex.service.dto.ProductDTO;

@Service
@Transactional
public class ProductService {

	private final Logger log = LoggerFactory.getLogger(ProductService.class);

	@Autowired
	private ProductRepository productRepository;

	@Transactional(readOnly = false)
	public Product createProduct(ProductDTO productDTO) {
		Product product = new Product();
		product.setCode(productDTO.getCode());
		product.setDescription(productDTO.getDescription());
		product.setStock(productDTO.getStock());

		productRepository.save(product);

		log.debug("Created Information for Product: {}", product);

		return product;
	}
	
	@Transactional(readOnly = false)
	public Product updateProduct(ProductDTO productDTO) {
		Product product = new Product();
		product.setId(productDTO.getId());
		product.setCode(productDTO.getCode());
		product.setDescription(productDTO.getDescription());
		product.setStock(productDTO.getStock());

		productRepository.save(product);

		log.debug("Created Information for Product: {}", product);

		return product;
	}

	@Transactional(readOnly = true)
	public List<ProductDTO> getAllProducts() {
		return productRepository.findAll().stream().map(product -> {
			ProductDTO productDTO = new ProductDTO();
			productDTO.setId(product.getId());
			productDTO.setCode(product.getCode());
			productDTO.setDescription(product.getDescription());
			productDTO.setStock(product.getStock());
			return productDTO;
		}).collect(Collectors.toList());
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
		Optional<Product> existingProduct = productRepository.findById(productId);
		Product product = null;
		if (existingProduct.isPresent()) {
			product = existingProduct.get();  
			product.setStock(product.getStock() + value);
			productRepository.save(product);
		}
		return product;
	}
	
	@Transactional(readOnly = false)
	public Product decreaseStock(Long productId, Integer value) {
		Optional<Product> existingProduct = productRepository.findById(productId);
		Product product = null;
		if (existingProduct.isPresent()) {
			product = existingProduct.get();  
			product.setStock((product.getStock() >= value) ? product.getStock() - value : 0);
			productRepository.save(product);
		}
		return product;
	}

}
