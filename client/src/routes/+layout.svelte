<script>
	import "../app.css";
	// your script goes here
</script>


<nav class="navbar bg-base-100 border-b">
    <div class="flex-1">
      <a href="/" class="btn btn-ghost normal-case text-2xl text-info font-bold">Manejo de Img/Pdf/Excel</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal">
        <li><a href="/products" class="btn btn-ghost text-info font-bold">Products Images</a></li>
        <li><a href="/write" class="btn btn-ghost text-info font-bold">Write Doc-Pdf-Excel</a></li>
      </ul>
    </div>
</nav>

<div class="container mx-auto">
	<slot />
</div>
