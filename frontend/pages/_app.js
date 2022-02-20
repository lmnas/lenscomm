/*
import App from "next/app"
import Head from "next/head"
import Layout from "../components/Layout"
import { getCategories } from "../utils/api"
import "../styles/index.css"

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout categories={pageProps.categories}>
      <Head>
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.css"
        />
        <script
          async
          src="https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.js"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  const categories = await getCategories()
  // Pass the data to our page via props
  return { ...appProps, pageProps: { categories, path: ctx.pathname } }
}

export default MyApp
*/

import React from "react";
import App from "next/app";
import Head from "next/head";
import Cookie from "js-cookie";
//import fetch from "isomorphic-fetch";
import Layout from "../components/Layout";
import AppContext from "../context/AppContext";
import { getStrapiURL } from "../utils/api";
import { getCategories } from "../utils/api"
import "../styles/index.css"

//import withData from "../lib/apollo";

class MyApp extends App {
 // const MyApp = ({ Component, pageProps }) => {

  state = {
   user: null,
  };

 
  
  componentDidMount() {
    // grab token value from cookie
    const token = Cookie.get("token");

    if (token) {
      // authenticate the token on the server and place set user object
      fetch(`${process.env.NEXT_PUBLIC_API_URL}users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          Cookie.remove("token");
          this.setState({ user: null });
          return null;
        }
        const user = await res.json();
        this.setUser(user);
      });
    }
  } 
  setUser = (user) => {
    this.setState({ user });
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          isAuthenticated: !!this.state.user,
          setUser: this.setUser,
        }}
      >
        <Head>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
        </Head>

   
       <Layout categories={pageProps.categories}>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>
    );
  }
}

export default MyApp
//export async function getStaticProps({}){
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  const categories = await getCategories()
  // Pass the data to our page via props
  return { ...appProps, pageProps: { categories, path: ctx.pathname } }
}
