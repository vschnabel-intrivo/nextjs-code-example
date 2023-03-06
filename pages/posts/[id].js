import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { sleep } from "../../lib/utils";
import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData }) {
  console.log("********* Rendered", postData);
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  console.log("********* getStaticPaths", paths);
  return {
    paths: paths.slice(0, 1),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  console.log("********* getStaticProps", params);
  await sleep(2000);
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
