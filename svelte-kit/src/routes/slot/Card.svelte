

<div class="card">
    <slot name="name">!!</slot>
    <slot name="age">??</slot>
    <slot name="email" domain="@email.com">&&</slot>
</div>

<style>
    .card{
        margin: 20px;
        padding: 12px;
        border: 1px solid royalblue;
        border-radius: 10px;
        box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
    }
</style>