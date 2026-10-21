import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  useColorScheme,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { Product } from '@/types';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 44) / 2;

const PETTAH_STREETS = [
  'All Locations',
  'Main Street',
  '1st Cross Street',
  '2nd Cross Street',
  'Keyzer Street',
  'Maliban Street',
];

const CATEGORIES = [
  'All',
  'Shoes',
  'Electronics',
  'Clothing',
  'Bags',
  'Watches',
  'Accessories',
];

export default function BazaarHomeScreen() {
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const router = useRouter();

  const {
    filteredProducts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    addToCart,
    toggleFavorite,
    isFavorite,
    shops,
  } = useApp();

  const renderProductItem = ({ item }: { item: Product }) => {
    const shop = shops.find((s) => s.id === item.shopId);
    const favorite = isFavorite(item.id);

    const discount =
      item.originalPrice && item.originalPrice > item.price
        ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
        : null;

    return (
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={() => router.push(`/product/${item.id}` as any)}
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.images[0] || 'https://picsum.photos/300/300' }}
            style={styles.image}
            resizeMode="cover"
          />

          {discount && (
            <View style={[styles.badge, { backgroundColor: '#EF4444' }]}>
              <Text style={styles.badgeText}>-{discount}%</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.favButton}
            onPress={() => toggleFavorite(item.id)}>
            <Ionicons
              name={favorite ? 'heart' : 'heart-outline'}
              size={18}
              color={favorite ? '#EF4444' : '#1E293B'}
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.cardContent}>
          {shop && (
            <View style={styles.shopRow}>
              <Ionicons name="location-sharp" size={11} color={theme.primary} />
              <Text
                numberOfLines={1}
                style={[styles.shopName, { color: theme.textSecondary }]}>
                {shop.area} • {shop.distance}
              </Text>
            </View>
          )}

          <Text
            numberOfLines={2}
            style={[styles.productName, { color: theme.text }]}>
            {item.name}
          </Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color="#F59E0B" />
            <Text style={[styles.ratingText, { color: theme.text }]}>
              {item.rating.toFixed(1)}
            </Text>
            <Text style={[styles.reviewText, { color: theme.textSecondary }]}>
              ({item.reviewCount})
            </Text>
          </View>

          {/* Price & Add */}
          <View style={styles.priceRow}>
            <View style={styles.priceColumn}>
              <Text style={[styles.price, { color: theme.primary }]}>
                Rs. {item.price.toLocaleString()}
              </Text>
              {item.originalPrice && (
                <Text style={styles.originalPrice}>
                  Rs. {item.originalPrice.toLocaleString()}
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: theme.primary }]}
              onPress={() => addToCart(item)}>
              <Ionicons name="add" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
      edges={['top']}>
      <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />

      {/* Top Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <View style={styles.brandRow}>
          <View>
            <View style={styles.titleWithBadge}>
              <Text style={[styles.appTitle, { color: theme.text }]}>
                Pettah<Text style={{ color: theme.primary }}>Bazaar</Text>
              </Text>
              <View style={[styles.marketTag, { backgroundColor: theme.primaryLight }]}>
                <Text style={[styles.marketTagText, { color: theme.primary }]}>
                  Colombo 11
                </Text>
              </View>
            </View>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Local merchants • Bazaar prices
            </Text>
          </View>

          <View style={[styles.liveIndicator, { borderColor: theme.border }]}>
            <View style={styles.pulseDot} />
            <Text style={[styles.liveText, { color: theme.secondary }]}>
              Bazaar Open
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: theme.backgroundElement,
              borderColor: theme.border,
            },
          ]}>
          <Ionicons name="search" size={18} color={theme.textSecondary} />
          <TextInput
            placeholder="Search shoes, electronics, watches..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: theme.text }]}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons
                name="close-circle"
                size={18}
                color={theme.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Street & Category Filters Header */}
      <View style={styles.filterSection}>
        {/* Streets Scroll */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={PETTAH_STREETS}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.streetList}
          renderItem={({ item }) => {
            const isSelected = selectedLocation === item;
            return (
              <TouchableOpacity
                onPress={() => setSelectedLocation(item)}
                style={[
                  styles.streetChip,
                  {
                    backgroundColor: isSelected
                      ? theme.primary
                      : theme.backgroundElement,
                    borderColor: isSelected ? theme.primary : theme.border,
                  },
                ]}>
                <Ionicons
                  name="navigate-outline"
                  size={12}
                  color={isSelected ? '#FFFFFF' : theme.textSecondary}
                  style={{ marginRight: 4 }}
                />
                <Text
                  style={[
                    styles.streetChipText,
                    { color: isSelected ? '#FFFFFF' : theme.text },
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* Categories Scroll */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => {
            const isSelected = selectedCategory === item;
            return (
              <TouchableOpacity
                onPress={() => setSelectedCategory(item)}
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor: isSelected
                      ? theme.secondary
                      : theme.card,
                    borderColor: isSelected ? theme.secondary : theme.border,
                  },
                ]}>
                <Text
                  style={[
                    styles.categoryChipText,
                    { color: isSelected ? '#FFFFFF' : theme.textSecondary },
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Product Count Row */}
      <View style={styles.resultsInfoRow}>
        <Text style={[styles.resultsCount, { color: theme.textSecondary }]}>
          Showing {filteredProducts.length} items in Pettah
        </Text>
        {(selectedCategory !== 'All' ||
          selectedLocation !== 'All Locations' ||
          searchQuery.length > 0) && (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory('All');
              setSelectedLocation('All Locations');
              setSearchQuery('');
            }}>
            <Text style={[styles.resetText, { color: theme.primary }]}>
              Clear Filters
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Products Grid */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        numColumns={2}
        contentContainerStyle={styles.gridContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search-outline"
              size={54}
              color={theme.textSecondary}
            />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              No items found
            </Text>
            <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
              Try searching for something else or clear your filters.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  marketTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  marketTagText: {
    fontSize: 10,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
  },
  pulseDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  liveText: {
    fontSize: 11,
    fontWeight: '700',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  filterSection: {
    paddingTop: 10,
  },
  streetList: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 6,
  },
  streetChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  streetChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  categoryList: {
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 4,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  resultsInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsCount: {
    fontSize: 12,
    fontWeight: '500',
  },
  resetText: {
    fontSize: 12,
    fontWeight: '700',
  },
  gridContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  card: {
    width: COLUMN_WIDTH,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 140,
    position: 'relative',
    backgroundColor: '#E2E8F0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  favButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    padding: 10,
  },
  shopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  shopName: {
    fontSize: 11,
    fontWeight: '500',
  },
  productName: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 17,
    minHeight: 34,
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
  },
  reviewText: {
    fontSize: 11,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  priceColumn: {
    flex: 1,
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
  },
  originalPrice: {
    fontSize: 11,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
  },
});
