package tecso.coop.kardex.service.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;

public class ProductDTO {

	private Long id;

	@NotBlank
	@Size(min = 1, max = 10)
	private String code;

	@NotBlank
	@Size(max = 50)
	private String description;

	@PositiveOrZero
	private Long stock;

	public ProductDTO() {
		// Empty constructor needed for Jackson.
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getStock() {
		return stock;
	}

	public void setStock(Long stock) {
		this.stock = stock;
	}

	@Override
	public String toString() {
		return "ProductDTO{" +
				"id=" + id +
				", code='" + code + '\'' +
				", description='" + description + '\'' +
				", stock=" + stock +
				'}';
	}

}
