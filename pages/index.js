import React from "react";
import Carousel from "../Components/Carousel";
import Home from "../Components/Home";
import Layout from "../Components/Layout";

export default function Index({ data }) {
  return (
    <Layout>
      <Carousel></Carousel>
      <Home></Home>
    </Layout>
  );
}
