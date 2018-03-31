const HTML = `<div>
    CHECKOUT HTML
    <form action="/submit" method="post" enctype="multipart/form-data">
        <label>
            Username
            <input type="text" name="username">
        </label>
        <label>
            Password
            <input type="password" name="password">
        </label>
        <input type="file" name="fil">
        <button type="submit">SUBMIT</button>
    </form>
</div>`

export default HTML