<script >   
 export let data;
 const { writingById } = data;
</script>
   
<h1 class="my-10 text-4xl font-bold text-center text-white">Doc Detail</h1>
<div class="min-h-screen hero">
    <div class="a4-container">
		<div class="button-row">
			<div class="card-actions justify-end">
				<a href="/write" class="btn btn-primary">Generate pdf</a>
			</div>  
		</div>
        <div class="a4-content">
            <div class="card-body">
                <div class="space-y-2">
                    <h3>{writingById.data.title}</h3>
                    <p>{writingById.data.text}</p>
                    <p>{writingById.data.date}</p>
                </div>       
            </div>  
        </div>
    </div>
</div>

<style>

.button-row {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px; /* Espacio entre los botones */
    }

    .a4-container {
        width: 210mm;
        height: 297mm;
        margin: auto;
        padding: 20mm;
        background: white;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .a4-content {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .card-body {
        /* Estilos existentes */
		padding: 1rem;
		border-radius: 0.5rem;
		background-color: #fff;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .btn {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }

</style>