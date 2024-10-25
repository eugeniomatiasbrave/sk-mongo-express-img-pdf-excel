<script>
    export let form;
    console.log(form);
</script>

<div class="min-h-screen hero">
    <div class="a4-container">
        <div class="a4-content">
            <h2 class="text-xl font-bold">New Writing</h2>
            <form method="POST" enctype="multipart/form-data">
                <div class="form-control">
                    <label class="label" for="title">
                        <span class="label-text">Title</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={form?.title ?? ''}
                        placeholder="Write the title here"
                        class="input input-ghost w-full"
                        required
                    />
                </div>
                <div class="form-control">
                    <label class="label" for="text">
                        <span class="label-text">Body of Text</span>
                    </label>
                    <textarea
                        name="text"
                        placeholder="Write the text here"
                        class="textarea textarea-ghost w-full"
                        required
                        >{form?.text ?? ''}</textarea>
                </div>
                <div class="mt-6 form-control">
                    <button class="btn btn-info" type="submit">Create Writing</button>
                </div>
            </form>
        </div>
    </div>
</div>

<style>
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

    .form-control {
        margin-bottom: 1rem;
    }

    .input, .textarea {
        width: 100%;
    }

    .textarea {
        min-height: 150mm;
        resize: vertical; /* Allow vertical resizing */
    }
</style>