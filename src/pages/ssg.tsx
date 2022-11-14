import { GetStaticProps, NextPage, NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// ページコンポーネントのpropsの型定義(ここでは空)
type SSGProps = {
    message: string
}

// SSG向けのページを実装
// NextPageはNext.jsのPages向けの型
// NextPage<props>でpropsが入るPageであることを明示
const SSG: NextPage<SSGProps> = (props) => {
    const { message } = props
    const router = useRouter()
    const onSubmit = () => {
        // 文字列の代わりにオブジェクトで指定できます。
        // /isr?keyword=helloへ遷移します。
        router.push({
            pathname: '/ssr',
            query: { keyword: 'hello' },
        })
    }
    return (
        <div>
            {/* Headコンポーネントで包むと、その要素は<head>タグに配置されます */}
            <Head>
                <title>Static Site Generation</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <p>
                    このページは静的サイト生成によってビルド時に生成されたページです
                </p>
                <p>{message}</p>
                <Link
                    href="/isr"
                >
                    <button>Jump to ISR Page</button>
                </Link>
                <br />
                <button onClick={onSubmit}>Go to SSR</button>
            </main>
        </div>
    )
}

// asyncは必ずつける
// getStaticPropsはビルドに実行される
// GetStaticProps<SSGProps>はSSGPropsを引数にとるgetStaticPropsの型
export const getStaticProps: GetStaticProps<SSGProps> = async (context) => {
    const timestamp = new Date().toLocaleString()
    const message = `${timestamp} にgetStaticPropsが実行されました`
    console.log(message)
    return {
        props: {
            message,
        },
    }
}

// ページコンポーネントはexport defaultでエクスポートする
export default SSG