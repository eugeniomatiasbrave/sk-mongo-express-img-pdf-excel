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


<div>
	<button on:click={sendHTMLToBackend}>Create PDF</button>
</div>

<div id="pdf-content">
	<h1>{writing.title}</h1>
	<p>{writing.text}</p>	
</div>
	



