import React from "react";
import Carousel from "../components/Carousel";
import Home from "../components/Home";
import Layout from "../components/Layout";

export default function Index({ data }) {
  return (
    <Layout>
      <Carousel></Carousel>
      <Home></Home>
    </Layout>
  );
}
