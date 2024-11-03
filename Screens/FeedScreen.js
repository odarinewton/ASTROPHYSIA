import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  ActivityIndicator 
} from 'react-native';
import axios from 'axios';

const FeedScreen = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch content from a news API or other sources
    axios
      .get('https://newsapi.org/v2/top-headlines', {
        params: {
          country: 'us',
          apiKey: 'f6f6841bb00c4389a3e35ec9ce1e803c', 
        },
      })
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {articles.map((article, index) => (
        <View key={index} style={styles.articleContainer}>
          {article.urlToImage && (
            <Image source={{ uri: article.urlToImage }} style={styles.articleImage} />
          )}
          <Text style={styles.articleTitle}>{article.title}</Text>
          <Text style={styles.articleDescription}>{article.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    top:25,
    flex: 1,
    padding: 7,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  articleContainer: {
    marginBottom: 20,
    backgroundColor:  "#1c1c1c",
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  articleTitle: {
    fontSize: 25,
    color:'green',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  articleDescription: {
    fontSize: 18,
    color: 'white',
  },
});

export default FeedScreen;
