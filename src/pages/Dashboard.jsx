import { useState,  useEffect  } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

//Button
import {Button } from "../stories/Button"

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [filteredOrders, setFilteredOrders] = useState(mockData.results);
  const [searchText, setSearchText] = useState();
  const [totalOrders, setTotalOrders] = useState({}); 
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  //Total number of orders
  useEffect(() => {
    setTotalOrders(mockData.results.length);
  }, []);

//Search Bar 
const handleSearch = (e) => {
  const search = e.target.value;
  setSearchText(search);

  setFilteredOrders(mockData.results.filter(order => {
    return  order["&id"].toLowerCase().includes(search.toLowerCase())
  }))
}

  
  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={`${totalOrders} orders`} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => handleSearch(e)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List rows={filteredOrders} time={timestamps.results} selectedItem={currency} setSelectedOrderDetails={setSelectedOrderDetails} setSelectedOrderTimeStamps={setSelectedOrderTimeStamps}/>
      </div>
      <Button />
    </div>
  );
};

export default Dashboard;
