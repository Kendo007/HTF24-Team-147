import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NFTProductPage from "./components/NFTProductPage";
import AllProducts from "./components/AllProduct";
import { useNFTMarketplace } from "./hooks/useNFTMarketplace";
import Home from "./views/Home";
import Login from "./views/Login";

export default function NFTMarketplace() {
  const [listedNFTs, setListedNFTs] = useState([]);
  const { fetchListedNFTs } = useNFTMarketplace();

  useEffect(() => {
    // Fetch listed NFTs

    async () => await fetchListedNFTs();
  }, []);

  return (
    <Router>
      <div className="min-h-screen">
        {/* <Navigation /> */}
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/products"
              element={<AllProducts nfts={listedNFTs} />}
            />
            <Route path="/product/1" element={<NFTProductPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
