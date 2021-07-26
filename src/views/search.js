import { html } from '../../node_modules/lit-html/lit-html.js';
import { articleTemplate } from './common/article.js';

import { search } from '../api/data.js';

const searchTemplate = (articles, onSearch, title) => html`
<section id="search-page" class="content">
    <h1>Search</h1>
    <form @submit=${onSearch} id="search-form">
        <p class="field search">
            <input id="search-input" type="text" placeholder="Search by article title" name="search" .value=${title
                || '' }>
        </p>
        <p class="field submit">
            <input class="btn submit" type="submit" value="Search">
        </p>
    </form>
    <div class="search-container">
        ${articles.length == 0 ? html`
        <h3 class="no-articles">No matching articles</h3>
        ` : articles.map(articleTemplate)}
    </div>
</section>`;

export async function searchPage(ctx) {
    let title = ctx.querystring.split('=')[1] || '';
    let articles = await search(title) || [];
    ctx.render(searchTemplate(articles, onSearch, title));
    async function onSearch(ev) {
        ev.preventDefault();
        const query = document.getElementById('search-input').value || '';
        ctx.page.redirect('/search?query=' + query);
    }
    
}
