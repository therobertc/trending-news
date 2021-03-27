import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  Platform,
  RefreshControl,
  FlatList
} from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import * as Linking from "expo-linking";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      final_data: [],
      popularstock: [],
      largecap: [],
      under5stock: [],
      topgainers: [],
      overbought: [],
      oversold: [],
      mostvolatile: [],
      newsfeeds: [],
      symbol: "",
      isSubscribed: false
    };
  }

  componentDidMount() {
    Linking.addEventListener("url", this.handleOpenURL);
    AsyncStorage.getItem("user")
      .then(user => {
        user = JSON.parse(user);
        this.setState({ isSubscribed: user.sub_status });
      })
      .catch(err => {
        console.log(err.message);
      });

    this.getTrandingData();

    this.getNews("spy");
  }

  getNews = symbol => {
    this.setState({ symbol: symbol });
    axios
      .get(
        `https://cloud-sse.iexapis.com/stable/stock/${symbol}/news/last/100?token=sk_978560584d02409696fa05c76b1fab11`,
        { headers: { Accept: "text/event-stream" } }
      )
      .then(response => {
        const arr = response.data.filter(a => a.lang === "en");
        this.setState({ newsfeeds: arr });
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleOpenURL);

    this.getTrandingData();
  }

  handleRefresh = () => {
    this.loadPage();
  };

  async getTrandingData() {
    return fetch("https://sharestock.io/api/trendingStock", {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            data: responseJson.data,
            isLoading: false
          },
          function() {}
        );
      })
      .catch(error => {
        this.setState({ isLoading: false });
        console.error(error);
      });
  }

  shuffleData() {
    this.setState({
      data: this.state.data.sort(() => Math.random() - 0.5)
    });
  }

  circleComponet() {
    if (this.state.data.length) {
      return this.state.data.map((service, index) => (
        <TouchableOpacity
          key={index}
          onPress={
            () => this.getNews(service.symbol)
            // this.props.navigation.navigate("search_detail", {
            //   symbol: service.symbol,
            // })
          }
          style={{ marginLeft: 5, borderRadius: 35 }}
        >
          <View
            style={{
              backgroundColor: "#FFF",
              justifyContent: "center",
              alignItems: "center",

              //borderWidth: 2,
              borderRadius: 20,
              shadowOffset: { width: 0.05, height: 0.05 },
              //shadowColor: "lightgrey",
              shadowOpacity: 0.05,
              borderColor:
                this.state.symbol === service.symbol ? "green" : "black"
            }}
          >
            <View style={styles.symbolview}>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 18,
                  color: "#000"
                }}
              >
                {service.symbol}
              </Text>

              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 14,
                  textAlign: "center",
                  color: parseFloat(service.changePercent) < 0 ? "red" : "green"
                }}
              >
                {parseFloat(service.changePercent) < 0
                  ? (parseFloat(service.changePercent) * 100).toFixed(2)
                  : "+" + (parseFloat(service.changePercent) * 100).toFixed(2)}
                %
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ));
    }
  }

  callBack = () => {
    console.log("hello");
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white"
          }}
        >
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          // refreshControl={
          //     <RefreshControl
          //         //tintColor={$.config.colors.style}
          //         onRefresh={() => this._refreshList()}
          //         refreshing={this.state.listRefreshing}
          //         onRefresh={this.handleRefresh}
          //     />
          // }
        >

          <View>
            <View style={styles.trendingstocksview}>
              <Text style={{ fontWeight: "bold", color: "#000", fontSize: 18 }}>
                Trending Stocks
              </Text>
              <TouchableOpacity onPress={() => this.shuffleData()}>
                <View style={{ flexDirection: "row" }}>
                  <Feather
                    name="repeat"
                    style={{ fontSize: 20, color: "#000" }}
                  ></Feather>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 3 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.containerstyle}
              >
                {this.circleComponet()}
              </ScrollView>
            </View>
          </View>

          <View style={styles.newsfeedsview}>
            <Text style={{ fontWeight: "bold", color: "#000", fontSize: 18 }}>
              Newsfeed
            </Text>
          </View>

          {this.state.newsfeeds.length > 0
            ? this.state.newsfeeds.map((val, ind) => {
                return (
                  <View>
                    <Text key={ind} style={styles.headline}>
                      {val.headline}
                    </Text>
                    <Text style={styles.date}>
                      {`${new Date(val.datetime)}`}
                    </Text>
                  </View>
                );
              })
            : null}
        </ScrollView>
      </View>
    );
  }
}

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#FFF"
    backgroundColor: "#F5F8FA"
    //backgroundColor: "#181c24"
  },
  text: {
    marginHorizontal: 8,
    marginVertical: 10
  },
  deleteScreener: {
    color: "#F32013",
    fontWeight: "800",
    textAlign: "center",
    paddingTop: 20
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36
  },
  searchbar: {
    marginTop: 0
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    margin: 0,
    marginTop: 0
  },
  formContent: {
    flexDirection: "row",
    //marginTop:30,
    backgroundColor: "#147efb"
  },
  icon: {
    width: 30,
    height: 30
  },
  iconBtnSearch: {
    alignSelf: "center"
  },
  inputs: {
    height: 50,
    marginLeft: 10,
    borderBottomColor: "#FFFFFF",
    //flex: 1,
    width: 300,
    backgroundColor: "white",
    marginBottom: 50
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: "center"
  },
  saveButton: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    //margin:10,
    width: 50,
    alignSelf: "flex-end",
    backgroundColor: "#147efb",
    borderRadius: 100,
    marginBottom: 10
  },
  saveButtonText: {
    color: "white"
  },
  notificationList: {
    marginTop: 20,
    padding: 10
  },
  notificationBox: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderRadius: 10
  },
  image: {
    width: 45,
    height: 45
  },
  description: {
    fontSize: 18,
    color: "#3498db",
    marginLeft: 10
  },
  datacard: {
    //backgroundColor: "#147efb",
    //height: 40,
    width: 100,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  stocktext: {
    fontSize: 18,
    fontWeight: "500",
    justifyContent: "center"
    // color: 'green'
  },

  stocktextred: {
    fontSize: 18,
    fontWeight: "500",
    justifyContent: "center"
    //color: 'red'
  },

  offerCard: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "lightgrey",
    shadowOpacity: 1.0,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "#e8eef1",
    margin: 10,
    borderRadius: 20,
    width: 340
  },
  screenContainer: {
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowColor: "lightgrey",
    shadowOpacity: 2.0,
    margin: 10,
    //backgroundColor: "#e8eef1",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    paddingTop: 20
  },
  topContainer: {
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowColor: "lightgrey",
    shadowOpacity: 2.0,
    marginHorizontal: 10,
    marginBottom: 10,
    //backgroundColor: "#e8eef1",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    paddingTop: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    //textAlign: "center"
    marginHorizontal: 20
  },
  subheading: {
    fontSize: 14,
    fontWeight: "400",
    //textAlign: "center",
    marginTop: 10,
    marginHorizontal: 20
  },
  ticker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tickertext: {
    //paddingLeft: 20,
    //paddingTop: 10,
    fontSize: 18,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center"
  },
  viewmore: {
    color: "#147efb",
    fontWeight: "500",
    textAlign: "center",
    paddingTop: 10
  },
  tickerbox: {
    padding: 10
  },
  seperator: {
    marginVertical: 10,
    borderColor: "#E1E8ED",
    borderWidth: 0.5
  },
  textview: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20
    //height: 100
  },
  headline: {
    color: "#000",
    fontWeight: "bold",
    margin: 10,
    marginBottom: 2
  },

  date: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 9,
    marginLeft: 10
  },
  symbolview: {
    borderRadius: 20,
    height: 70,
    width: 100,
    borderWidth: 2.5,
    borderColor: "lightgrey",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12
  },
  cotainerstyle: {
    alignItems: "center",
    paddingStart: 5,
    paddingEnd: 5,
    paddingTop: 10
  },
  trendingstocksview: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  newsfeedsview: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});
