# Using external sources for static props

To parse Markdown you will need `gray-matter`:

```bash
npm install gray-matter
```

Now you need to write your library to parse files `lib/static-content.js`.

```js
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'static-content');

export function getStaticContent(fileName) {
  const fullPath = path.join(contentDirectory, `${fileName}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  console.log(matterResult);

  return {
    ...matterResult.data
  }
}
```

And use it:

```js
import styled from 'styled-components';
import Layout from '../../components/layout';
import {getStaticContent} from '../../lib/static-content';

export async function getStaticProps() {
  const contentData = getStaticContent('about');
  return {
    props: {
      contentData
    }
  }
}

const Title = styled.h1`
  font-size: 20px;
  color: Red;
`;

export default function WhackAZombieMole({ contentData }) {
  return (
    <Layout>
      {contentData.title}
    </Layout>
  );
}

```
## Fetch API instead of a filesystem

```js
export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..')
  return res.json()
}
```

## Using a database

```js
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
```

__Notice:__ You can use static props only in page files. That's because it works sever-side.