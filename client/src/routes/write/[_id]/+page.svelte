<script>
	export let data;	
	const {writingById} = data;
    console.log(writingById.data)

    const writing = writingById.data;

	const id = writingById.data._id;

	let pdfUrl = '';

	async function sendHTMLToBackend() {

        const contentDiv = document.querySelector('#pdf-content').outerHTML;

        
            const response = await fetch('http://localhost:8080/api/writings/pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ html: contentDiv, id: id })
            });

			const result = await response.json();
			if (result.status === 'success') {
				pdfUrl = `http://localhost:8080${result.url}`;
            window.open(pdfUrl, '_blank');
        } else {
            console.error('Error al crear el PDF:', result.error);
        }
      
    }

</script>
<div class="flex justify-center">
<div class="w-1/3 rounded-md shadow-xl card bg-base-100 mt-14">

	<button  on:click={sendHTMLToBackend}>Create PDF</button>
  
  <div id="pdf-content">
	<h1>{writing.title}</h1>
	<p>{writing.text}</p>	
  </div>
</div>
</div>


<style>
   

    #pdf-content {
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        padding: 1rem;
        border: 1px solid #fffefe;
        border-radius: 5px;
        background-color: #fffbfb;
    }
    h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    p {
        font-size: 1.2rem;
    }

    button {
        width: 30%;
        margin: 5px;
        padding: 0.5rem 1rem;
        background-color: #ff0022;
        color: rgb(255, 255, 255);
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
</style>
	



