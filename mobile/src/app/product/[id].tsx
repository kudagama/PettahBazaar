import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  useColorScheme,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const router = useRouter();

  const { products, shops, addToCart, toggleFavorite, isFavorite } = useApp();

  const product = products.find((p) => p.id === id);
  const shop = shops.find((s) => s.id === product?.shopId);
  const favorite = product ? isFavorite(product.id) : false;

  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes?.[0] || 'Standard'
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors?.[0]?.name || 'Default'
  );
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!product) {
    return (
      <SafeAreaView
        style={[styles.notFoundContainer, { backgroundColor: theme.background }]}>
        <Ionicons
          name="alert-circle-outline"
          size={60}
          color={theme.textSecondary}
        />
        <Text style={[styles.notFoundText, { color: theme.text }]}>
          Product not found
        </Text>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: theme.primary }]}
          onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : null;

  const handleCall = () => {
    if (!shop?.phone) return;
    Linking.openURL(`tel:${shop.phone.replace(/\s+/g, '')}`).catch(() => {
      Alert.alert('Unable to call', `Call: ${shop.phone}`);
    });
  };

  const handleWhatsApp = () => {
    const number = (shop?.whatsapp || '+94772345678').replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hello ${shop?.name || 'Merchant'}, I am interested in *${product.name}* (Rs. ${product.price.toLocaleString()}) on PettahBazaar mobile app. Size: ${selectedSize}, Color: ${selectedColor}. Is it available at your stall?`
    );
    Linking.openURL(`https://wa.me/${number}?text=${message}`).catch(() => {
      Alert.alert('Unable to open WhatsApp', 'WhatsApp application not found.');
    });
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    Alert.alert(
      'Added to Bazaar Bag',
      `${product.name} (${selectedSize}, ${selectedColor}) has been added to your cart.`,
      [
        { text: 'Keep Browsing', style: 'cancel' },
        { text: 'View Bag', onPress: () => router.push('/(tabs)/cart') },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen
        options={{
          title: product.name,
          headerRight: () => (
            <TouchableOpacity onPress={() => toggleFavorite(product.id)}>
              <Ionicons
                name={favorite ? 'heart' : 'heart-outline'}
                size={22}
                color={favorite ? '#EF4444' : theme.text}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Main Image */}
        <View style={styles.imageGallery}>
          <Image
            source={{
              uri:
                product.images[activeImageIdx] ||
                product.images[0] ||
                'https://picsum.photos/500/500',
            }}
            style={styles.mainImage}
            resizeMode="cover"
          />

          {discount && (
            <View style={[styles.discountBadge, { backgroundColor: '#EF4444' }]}>
              <Text style={styles.discountBadgeText}>-{discount}% OFF</Text>
            </View>
          )}

          {/* Multi-image indicators if >1 */}
          {product.images.length > 1 && (
            <View style={styles.imageDotsRow}>
              {product.images.map((img, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setActiveImageIdx(idx)}
                  style={[
                    styles.thumbnail,
                    activeImageIdx === idx && {
                      borderColor: theme.primary,
                      borderWidth: 2,
                    },
                  ]}>
                  <Image source={{ uri: img }} style={styles.thumbImg} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Product Details Section */}
        <View style={styles.detailsSection}>
          <View style={styles.categoryRow}>
            <View
              style={[
                styles.categoryTag,
                { backgroundColor: theme.primaryLight },
              ]}>
              <Text style={[styles.categoryTagText, { color: theme.primary }]}>
                {product.category}
              </Text>
            </View>

            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={13} color="#F59E0B" />
              <Text style={[styles.ratingVal, { color: theme.text }]}>
                {product.rating.toFixed(1)}
              </Text>
              <Text style={[styles.ratingCount, { color: theme.textSecondary }]}>
                ({product.reviewCount} reviews)
              </Text>
            </View>
          </View>

          <Text style={[styles.productTitle, { color: theme.text }]}>
            {product.name}
          </Text>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={[styles.priceText, { color: theme.primary }]}>
              Rs. {product.price.toLocaleString()}
            </Text>
            {product.originalPrice && (
              <Text style={styles.originalPriceText}>
                Rs. {product.originalPrice.toLocaleString()}
              </Text>
            )}
            <View
              style={[
                styles.stockBadge,
                {
                  backgroundColor: product.inStock
                    ? 'rgba(16, 185, 129, 0.15)'
                    : 'rgba(239, 68, 68, 0.15)',
                },
              ]}>
              <Text
                style={[
                  styles.stockBadgeText,
                  { color: product.inStock ? '#10B981' : '#EF4444' },
                ]}>
                {product.inStock ? 'In Stock in Pettah' : 'Out of Stock'}
              </Text>
            </View>
          </View>

          {/* Sizes Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <View style={styles.optionSection}>
              <Text style={[styles.optionLabel, { color: theme.text }]}>
                Select Size: <Text style={{ color: theme.primary }}>{selectedSize}</Text>
              </Text>
              <View style={styles.chipsRow}>
                {product.sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <TouchableOpacity
                      key={sz}
                      onPress={() => setSelectedSize(sz)}
                      style={[
                        styles.sizeChip,
                        {
                          backgroundColor: isSelected
                            ? theme.primary
                            : theme.backgroundElement,
                          borderColor: isSelected
                            ? theme.primary
                            : theme.border,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.sizeChipText,
                          { color: isSelected ? '#FFFFFF' : theme.text },
                        ]}>
                        {sz}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Colors Selection */}
          {product.colors && product.colors.length > 0 && (
            <View style={styles.optionSection}>
              <Text style={[styles.optionLabel, { color: theme.text }]}>
                Select Color:{' '}
                <Text style={{ color: theme.primary }}>{selectedColor}</Text>
              </Text>
              <View style={styles.chipsRow}>
                {product.colors.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <TouchableOpacity
                      key={c.name}
                      onPress={() => setSelectedColor(c.name)}
                      style={[
                        styles.colorChip,
                        {
                          backgroundColor: isSelected
                            ? theme.secondary
                            : theme.backgroundElement,
                          borderColor: isSelected
                            ? theme.secondary
                            : theme.border,
                        },
                      ]}>
                      <View
                        style={[styles.colorDot, { backgroundColor: c.hex }]}
                      />
                      <Text
                        style={[
                          styles.colorChipText,
                          { color: isSelected ? '#FFFFFF' : theme.text },
                        ]}>
                        {c.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Merchant Stall Card */}
          {shop && (
            <View
              style={[
                styles.shopCard,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}>
              <View style={styles.shopCardHeader}>
                <Image
                  source={{
                    uri: shop.imageUrl || 'https://picsum.photos/100/100',
                  }}
                  style={styles.shopAvatar}
                />
                <View style={{ flex: 1 }}>
                  <View style={styles.shopVerifiedRow}>
                    <Text style={[styles.shopCardName, { color: theme.text }]}>
                      {shop.name}
                    </Text>
                    {shop.verified && (
                      <Ionicons
                        name="checkmark-circle"
                        size={15}
                        color={theme.secondary}
                      />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.shopCardArea,
                      { color: theme.textSecondary },
                    ]}>
                    {shop.address} {shop.stallNumber ? `(${shop.stallNumber})` : ''}
                  </Text>
                  <Text style={[styles.shopDistance, { color: theme.primary }]}>
                    📍 {shop.distance} from Pettah Clock Tower
                  </Text>
                </View>
              </View>

              <View style={styles.shopBtnRow}>
                <TouchableOpacity
                  style={[styles.shopBtn, { borderColor: theme.border }]}
                  onPress={handleCall}>
                  <Ionicons name="call-outline" size={15} color={theme.text} />
                  <Text style={[styles.shopBtnText, { color: theme.text }]}>
                    Call Stall
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.shopBtn, styles.waShopBtn]}
                  onPress={handleWhatsApp}>
                  <Ionicons name="logo-whatsapp" size={16} color="#FFFFFF" />
                  <Text style={[styles.shopBtnText, { color: '#FFFFFF' }]}>
                    Inquire on WhatsApp
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Description */}
          <View style={styles.descSection}>
            <Text style={[styles.sectionHeading, { color: theme.text }]}>
              Description & Details
            </Text>
            <Text style={[styles.descText, { color: theme.textSecondary }]}>
              {product.description}
            </Text>

            {product.material && (
              <View style={styles.specRow}>
                <Text style={[styles.specKey, { color: theme.textSecondary }]}>
                  Material:
                </Text>
                <Text style={[styles.specVal, { color: theme.text }]}>
                  {product.material}
                </Text>
              </View>
            )}

            {product.brand && (
              <View style={styles.specRow}>
                <Text style={[styles.specKey, { color: theme.textSecondary }]}>
                  Brand:
                </Text>
                <Text style={[styles.specVal, { color: theme.text }]}>
                  {product.brand}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: theme.card,
            borderTopColor: theme.border,
          },
        ]}>
        <TouchableOpacity
          style={[styles.cartBtn, { backgroundColor: theme.primary }]}
          onPress={handleAddToCart}>
          <Ionicons name="cart-outline" size={20} color="#FFFFFF" />
          <Text style={styles.cartBtnText}>Add to Bag</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickWaBtn}
          onPress={handleWhatsApp}>
          <Ionicons name="logo-whatsapp" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 90,
  },
  imageGallery: {
    width: '100%',
    position: 'relative',
    backgroundColor: '#E2E8F0',
  },
  mainImage: {
    width: width,
    height: width * 0.85,
  },
  discountBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  imageDotsRow: {
    flexDirection: 'row',
    padding: 10,
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 6,
    overflow: 'hidden',
  },
  thumbImg: {
    width: '100%',
    height: '100%',
  },
  detailsSection: {
    padding: 16,
    gap: 14,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTag: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  categoryTagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingVal: {
    fontSize: 12,
    fontWeight: '700',
  },
  ratingCount: {
    fontSize: 11,
  },
  productTitle: {
    fontSize: 19,
    fontWeight: '800',
    lineHeight: 25,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  priceText: {
    fontSize: 22,
    fontWeight: '900',
  },
  originalPriceText: {
    fontSize: 14,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  stockBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  optionSection: {
    gap: 8,
  },
  optionLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sizeChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
  },
  sizeChipText: {
    fontSize: 13,
    fontWeight: '700',
  },
  colorChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  colorChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  shopCard: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
  },
  shopCardHeader: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  shopAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E2E8F0',
  },
  shopVerifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  shopCardName: {
    fontSize: 14,
    fontWeight: '800',
  },
  shopCardArea: {
    fontSize: 11,
    marginTop: 1,
  },
  shopDistance: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  shopBtnRow: {
    flexDirection: 'row',
    gap: 8,
  },
  shopBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  waShopBtn: {
    backgroundColor: '#25D366',
    borderColor: '#25D366',
  },
  shopBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  descSection: {
    gap: 8,
    marginTop: 4,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
  },
  descText: {
    fontSize: 13,
    lineHeight: 19,
  },
  specRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  specKey: {
    fontSize: 12,
  },
  specVal: {
    fontSize: 12,
    fontWeight: '700',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    gap: 10,
  },
  cartBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
  },
  cartBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  quickWaBtn: {
    backgroundColor: '#25D366',
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 12,
  },
  notFoundText: {
    fontSize: 17,
    fontWeight: '700',
  },
  backBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
