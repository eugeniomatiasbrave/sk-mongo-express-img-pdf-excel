<script>
    export let data;
    const Writings = data.writings.payload;

    let xlsxUrl = '';

    async function createXLSX() {
        try {
            const response = await fetch('http://localhost:8080/api/writings/xlsx', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( { data: Writings })
            });

            const result = await response.json();
            if (result.status === 'success') {
                xlsxUrl = `http://localhost:8080${result.url}`;
                window.open(xlsxUrl, '_blank');
            } else {
                console.error('Error al crear el Excel:', result.error);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    }


</script>

<h2 class="my-4 text-4xl font-bold text-center text-white">List of Writings, PDFs & Generate excel</h2>
<!-- Contenedor de lista de favoritos -->
<div class="w-full rounded-md shadow-xl card bg-base-100">
    <div class="card-body">
        <div class="flex justify-between">
          <div>
            <a href="/write/create" class="btn btn-secondary">Create Writing</a>  
          </div>
          <div>
            <button on:click={createXLSX} class="btn btn-success text-white">Create Excel</button>  
          </div>
        </div>
        <div class="container-table ">
            <div class="overflow-x-auto border rounded-lg">
                <table class="table  ">
                    <!-- head -->
                    <thead class="text-center">
                        <tr>
                            <th>Id</th>
                            <th>Creation date</th>
                            <th>Title</th>
                            <th>Text</th>
                            <th>Doc & PDF</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        {#each Writings as w (w._id)}
                            <tr class="hover">
                                <td>{w._id}</td>
                                <td>{w.date}</td>
                                <td>{w.title}</td>
                                <td class="truncate max-w-xs">{w.text}</td> <!-- Limitar a 100 caracteres -->
                                <td>
                                    <a href={`/write/${w._id}`} class="btn btn-error text-white">View Doc & PDF.</a>
                                </td>
                                <td>
                                    <a href={`/write/${w._id}/edit`} class="btn btn-primary">Edit</a>
                                </td>
                                <td>
                                    <form method="POST" action={`/write/${w._id}/delete`}>
                                        <input type="hidden" name="wid" value={w._id} />
                                        <button type="submit" class="btn btn-secondary">Delete</button>
                                    </form>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>