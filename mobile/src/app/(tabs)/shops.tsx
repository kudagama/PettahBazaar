import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  TextInput,
  useColorScheme,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { Shop } from '@/types';

export default function ShopsScreen() {
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const router = useRouter();
  const { shops, setSelectedLocation, setSearchQuery } = useApp();
  const [shopQuery, setShopQuery] = useState('');

  const filteredShops = shops.filter(
    (s) =>
      s.name.toLowerCase().includes(shopQuery.toLowerCase()) ||
      s.area.toLowerCase().includes(shopQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(shopQuery.toLowerCase()) ||
      s.specialties.some((spec) =>
        spec.toLowerCase().includes(shopQuery.toLowerCase())
      )
  );

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone.replace(/\s+/g, '')}`).catch(() => {
      Alert.alert('Unable to call', `Dial: ${phone}`);
    });
  };

  const handleWhatsApp = (whatsapp?: string, shopName?: string) => {
    if (!whatsapp) return;
    const cleanNumber = whatsapp.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `Hello ${shopName || ''}, I found your shop on PettahBazaar mobile app. I would like to inquire about your products.`
    );
    Linking.openURL(`https://wa.me/${cleanNumber}?text=${msg}`).catch(() => {
      Alert.alert('Unable to open WhatsApp', `Contact: ${whatsapp}`);
    });
  };

  const handleViewProducts = (shop: Shop) => {
    setSelectedLocation(shop.area);
    router.push('/(tabs)');
  };

  const renderShopItem = ({ item }: { item: Shop }) => {
    return (
      <View
        style={[
          styles.shopCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}>
        {/* Shop Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.imageUrl || 'https://picsum.photos/400/250' }}
            style={styles.shopImage}
            resizeMode="cover"
          />
          <View style={styles.distanceBadge}>
            <Ionicons name="footsteps-outline" size={11} color="#FFFFFF" />
            <Text style={styles.distanceText}>{item.distance}</Text>
          </View>
          {item.verified && (
            <View style={[styles.verifiedBadge, { backgroundColor: theme.secondary }]}>
              <Ionicons name="checkmark-circle" size={12} color="#FFFFFF" />
              <Text style={styles.verifiedText}>Verified Merchant</Text>
            </View>
          )}
        </View>

        {/* Info */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={[styles.shopName, { color: theme.text }]}>
              {item.name}
            </Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color="#F59E0B" />
              <Text style={[styles.ratingVal, { color: theme.text }]}>
                {item.rating.toFixed(1)}
              </Text>
              <Text style={[styles.ratingCount, { color: theme.textSecondary }]}>
                ({item.reviewCount})
              </Text>
            </View>
          </View>

          <Text style={[styles.ownerText, { color: theme.textSecondary }]}>
            Owner: {item.ownerName} {item.established ? `• Est. ${item.established}` : ''}
          </Text>

          {/* Address & Stall */}
          <View style={styles.addressRow}>
            <Ionicons name="location-outline" size={14} color={theme.primary} />
            <Text style={[styles.addressText, { color: theme.text }]}>
              {item.address} {item.stallNumber ? `(${item.stallNumber})` : ''}
            </Text>
          </View>

          <View style={styles.hoursRow}>
            <Ionicons name="time-outline" size={13} color={theme.textSecondary} />
            <Text style={[styles.hoursText, { color: theme.textSecondary }]}>
              {item.openHours}
            </Text>
          </View>

          {/* Specialties */}
          <View style={styles.specialtiesWrap}>
            {item.specialties.slice(0, 3).map((spec, i) => (
              <View
                key={i}
                style={[
                  styles.specChip,
                  { backgroundColor: theme.backgroundElement },
                ]}>
                <Text style={[styles.specText, { color: theme.textSecondary }]}>
                  {spec}
                </Text>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[
                styles.actionBtn,
                styles.callBtn,
                { borderColor: theme.border },
              ]}
              onPress={() => handleCall(item.phone)}>
              <Ionicons name="call-outline" size={15} color={theme.text} />
              <Text style={[styles.btnText, { color: theme.text }]}>Call</Text>
            </TouchableOpacity>

            {item.whatsapp && (
              <TouchableOpacity
                style={[styles.actionBtn, styles.waBtn]}
                onPress={() => handleWhatsApp(item.whatsapp, item.name)}>
                <Ionicons name="logo-whatsapp" size={16} color="#FFFFFF" />
                <Text style={[styles.btnText, { color: '#FFFFFF' }]}>
                  WhatsApp
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                styles.actionBtn,
                styles.viewBtn,
                { backgroundColor: theme.primary },
              ]}
              onPress={() => handleViewProducts(item)}>
              <Ionicons name="bag-handle-outline" size={15} color="#FFFFFF" />
              <Text style={[styles.btnText, { color: '#FFFFFF' }]}>
                Products
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
      edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Pettah Merchants & Stalls
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          Direct connection to stall owners on Main St, Cross Streets & Keyzer St
        </Text>

        {/* Search */}
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
            placeholder="Search by shop name, street or specialty..."
            placeholderTextColor={theme.textSecondary}
            value={shopQuery}
            onChangeText={setShopQuery}
            style={[styles.searchInput, { color: theme.text }]}
          />
          {shopQuery.length > 0 && (
            <TouchableOpacity onPress={() => setShopQuery('')}>
              <Ionicons
                name="close-circle"
                size={18}
                color={theme.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredShops}
        keyExtractor={(item) => item.id}
        renderItem={renderShopItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    height: '100%',
  },
  listContent: {
    padding: 16,
    gap: 16,
  },
  shopCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 140,
    position: 'relative',
    backgroundColor: '#E2E8F0',
  },
  shopImage: {
    width: '100%',
    height: '100%',
  },
  distanceBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  distanceText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  content: {
    padding: 14,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  shopName: {
    fontSize: 16,
    fontWeight: '800',
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingVal: {
    fontSize: 12,
    fontWeight: '700',
  },
  ratingCount: {
    fontSize: 11,
  },
  ownerText: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: 6,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 4,
  },
  addressText: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
    lineHeight: 16,
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  hoursText: {
    fontSize: 11,
  },
  specialtiesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  specChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  specText: {
    fontSize: 11,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: 10,
  },
  callBtn: {
    borderWidth: 1,
  },
  waBtn: {
    backgroundColor: '#25D366',
  },
  viewBtn: {},
  btnText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
