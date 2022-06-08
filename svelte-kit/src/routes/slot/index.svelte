<script>
    import Button from './Button.svelte';
    import Card from './Card.svelte'; 
    import UserCard from './UserCard.svelte';
</script>

<Button />
<Button>Submit!!!</Button>
<Button block={true}>Submit!!!</Button>
<Button color="royalblue">Submit!!!</Button>
<Button color="red" block>Danger</Button>
<hr />
<Card>
    <div slot="age">85</div>
    <h2 slot="name">Helopy</h2>
    <div class="email" slot="email" let:domain>
        email{domain}
    </div>
</Card>
<hr />
<UserCard>
    <h2 slot="name">HEROPY</h2>
    <h2 slot="age">85</h2>
    <h2 slot="email">email@email.com</h2>
</UserCard>
<UserCard>
    <h2 slot="name">HEROPY</h2>
    <h2 slot="email">email@email.com</h2>
</UserCard>

<style>
    .email{
        color: yellowgreen;
    }
</style>