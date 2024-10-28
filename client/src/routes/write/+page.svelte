<script>
    export let data;
    const Writings = data.writings.payload;
    console.log(Writings);
</script>

<h2 class="my-4 text-4xl font-bold text-center text-white">List of Writings & PDFs</h2>
<div class="my-2">
    <a href="/write/create" class="btn btn-secondary">Create Writing</a>  
</div>
<!-- Contenedor de lista de favoritos -->
<div class="w-full rounded-md shadow-xl card bg-base-100">
    <div class="card-body">
        <div class="container-table">
            <div class="overflow-x-auto">
                <table class="table">
                    <!-- head -->
                    <thead class="text-center">
                        <tr>
                            <th>Creation date</th>
                            <th>Title</th>
                            <th>File</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        {#each Writings as w (w._id)}
                            <tr class="hover">
                                <td>{w.date}</td>
                                <td>{w.title}</td>
                                <td>
                                    <a href={`/write/${w._id}`} class="btn btn-primary">View Doc.</a>
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