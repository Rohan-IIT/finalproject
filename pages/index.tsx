import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head >
        <title>FE - Rohan Pawar</title>
        <meta name="description" content="Front end Assignment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Student register
        </h1>

        <div className={styles.grid}>
          <a href="user-details" className={styles.card}>
            <h2>Get student data &rarr;</h2>
          </a>

        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          Design and developed by Rohan
        </p>
      </footer>
    </div>
  )
}

export default Home
