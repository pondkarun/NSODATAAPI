import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript>

          </NextScript>
          <script
              src="https://code.jquery.com/jquery-3.6.0.slim.min.js"
              integrity="sha256-u7e5khyithlIdTpu22PHhENmPcRdFiHRjhAuHcs05RI="
              crossorigin="anonymous"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument