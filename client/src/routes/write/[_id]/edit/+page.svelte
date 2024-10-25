<script>
export let data;
const { product } = data;

console.log(product.data.name);
console.log(product.data.price);

</script>

<div class="min-h-screen hero">
    <div class="flex-col hero-content lg:flex-row-reverse">
        <div class="flex-shrink-0 w-full max-w-sm shadow-lg card rounded-xl bg-base-100">
            <div class="card-body">
                <h2 class="text-xl font-bold">Edit Product</h2>
                <form method="POST" enctype="multipart/form-data">
                    <input type="hidden" name="id" value={product.data._id} />
                    <div>
                        {#each product.data.image as img}
                            <img src={"http://localhost:8080" + img.path} alt={product.data.name} class="w-25 h-25" />
                        {/each}
                    </div>
                    <div class="form-control">
                        <label class="label" for="name">
                            <span class="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={product.data.name}
                            placeholder="Product Name"
                            class="input input-bordered"
                            required
                        />
                    </div>
                    <div class="form-control">
                        <label class="label" for="price">
                            <span class="label-text">Price</span>
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={product.data.price}
                            placeholder="Price of Product"
                            class="input input-bordered"
                            required
                        />
                    </div>

                    <div class="form-control">
						<label class="label" for="image">
							<span class="label-text">Image</span>
						</label>
						<input type="file" 
						       class="file-input file-input-bordered file-input-sm w-full max-w-xs"
							   accept="image/png , .jpg , .jpeg , image/gif, image/webp" 
							   multiple
						       name="image"
							   />
					</div>
                    <div class="mt-6 form-control">
                        <button class="btn btn-info" type="submit">Update Product</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>