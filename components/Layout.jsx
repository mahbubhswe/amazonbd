import Head from "next/head";
import React from "react";
import Navbar from "./Navbar";
import Footer from "../components/Footer";
export default function Layout({ pageTitle, children }) {
  return (
    <div>
      <Head>
        <title>
          {pageTitle ? pageTitle + "| Amazonbd" : "Walcome to Amazonbd"}
        </title>
      </Head>
      <header>
        <Navbar></Navbar>
      </header>
      <main>{children}</main>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}
