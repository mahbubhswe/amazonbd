import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styles from "../styles/Carousel.module.css";
import Image from "next/image";
import sl1 from "../public/img/sl1.gif";
import sl2 from "../public/img/sl2.gif";
import sl3 from "../public/img/sl3.gif";
import { Heading } from "@chakra-ui/react";
export default function Index() {
  return (
    <div>
      <Carousel
        showIndicators={true}
        autoPlay={true}
        showStatus={false}
        infiniteLoop={true}
        stopOnHover={true}
        showThumbs={false}
      >
        <div style={{ background: "#F9B42D", height: "400px" }}>
          <div className={styles.carouselContainer}>
            <div className={styles.carouselItem}>
              <Heading color={"#FFFFFF"}>
                We ship over 35 million products in bangladesh
              </Heading>
            </div>
            <div className={styles.carouselItem}>
              <Image
                src={sl1}
                alt="Photo"
                height={400}
                width={400}
                quality={100}
              />
            </div>
          </div>
        </div>
        <div style={{ background: "#82ECEC", height: "400px" }}>
          <div className={styles.carouselContainer}>
            <div className={styles.carouselItem}>
              <Heading color={"#4D5BCA"}>Easy Way to Shoping</Heading>
            </div>
            <div className={styles.carouselItem}>
              <Image
                src={sl2}
                alt="Photo"
                height={400}
                width={400}
                quality={100}
              />
            </div>
          </div>
        </div>

        <div style={{ background: "#464FAF", height: "400px" }}>
          <div className={styles.carouselContainer}>
            <div className={styles.carouselItem}>
              <Heading color={"#FFFFFF"}>Shope Man & Women dress</Heading>
            </div>
            <div className={styles.carouselItem}>
              <Image
                src={sl3}
                alt="Photo"
                height={400}
                width={500}
                quality={100}
              />
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}
