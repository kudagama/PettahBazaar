import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

interface StreetGuide {
  name: string;
  category: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
  tip: string;
}

const PETTAH_GUIDES: StreetGuide[] = [
  {
    name: 'Main Street',
    category: 'Shoes, Formalwear & Leather',
    icon: 'shirt-outline',
    description:
      'The central artery of Pettah. Flanked with multi-story shoe emporiums, formal shirts, leather belts, and bag stores.',
    tip: 'Compare 2-3 shops before buying; sizes are often kept in back storage rooms.',
  },
  {
    name: '1st Cross Street',
    category: 'Electronics & Mobile City',
    icon: 'hardware-chip-outline',
    description:
      'Sri Lanka’s biggest wholesale electronics corridor. Power banks, Bluetooth earphones, smartwatches, phone cases and cables.',
    tip: 'Ask for shop warranty cards for electronics before leaving the counter.',
  },
  {
    name: '2nd Cross Street',
    category: 'Textiles & Sarees',
    icon: 'color-palette-outline',
    description:
      'Thousands of rolls of fabrics, silk sarees, linen, and curtain cloth at bazaar prices.',
    tip: 'Bargaining is expected for bulk purchases over 5 meters.',
  },
  {
    name: 'Keyzer Street',
    category: 'Leather & Hardware',
    icon: 'construct-outline',
    description:
      'Specialized hub for raw leather, zippers, bag accessories, sewing materials, and tools.',
    tip: 'Best for craftspeople, cobblers, and DIY repairs.',
  },
  {
    name: 'Maliban Street',
    category: 'Wedding Cards & Stationery',
    icon: 'document-text-outline',
    description:
      'Famous countrywide for custom invitations, printing presses, wholesale paper, and gift boxes.',
    tip: 'Print proofs are usually provided within 24 hours.',
  },
  {
    name: 'Sea Street',
    category: 'Gold & Jewelry',
    icon: 'sparkles-outline',
    description:
      'Pettah’s historic gold street adorned with traditional Sri Lankan and South Indian jewelers.',
    tip: 'Gold sovereign rates change daily at 10:30 AM based on global spot prices.',
  },
];

export default function GuideScreen() {
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const router = useRouter();
  const { setSelectedLocation } = useApp();

  const handleStreetSelect = (streetName: string) => {
    setSelectedLocation(streetName);
    router.push('/(tabs)');
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
      edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Pettah Street Navigator
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          Know which street has what you need in Colombo 11
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        {/* Transit & Tips Banner */}
        <View
          style={[
            styles.bannerCard,
            { backgroundColor: theme.primaryLight, borderColor: theme.primary },
          ]}>
          <View style={styles.bannerRow}>
            <Ionicons name="train-outline" size={24} color={theme.primary} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.bannerTitle, { color: theme.primary }]}>
                Transit & Proximity
              </Text>
              <Text style={[styles.bannerDesc, { color: theme.text }]}>
                Colombo Fort Railway Station and Central Bastian Bus Stand are
                only 250m walking distance from Main Street entrance.
              </Text>
            </View>
          </View>
        </View>

        {/* Shopping Tips */}
        <View
          style={[
            styles.tipsCard,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}>
          <Text style={[styles.sectionHeading, { color: theme.text }]}>
            💡 Bazaar Insider Tips
          </Text>
          <View style={styles.tipItem}>
            <Ionicons name="time" size={16} color="#F59E0B" />
            <Text style={[styles.tipItemText, { color: theme.textSecondary }]}>
              <Text style={{ fontWeight: '700', color: theme.text }}>
                Best Hours:
              </Text>{' '}
              9:00 AM – 11:30 AM is ideal to avoid intense midday crowds.
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="cash" size={16} color="#10B981" />
            <Text style={[styles.tipItemText, { color: theme.textSecondary }]}>
              <Text style={{ fontWeight: '700', color: theme.text }}>
                Payment:
              </Text>{' '}
              Most stalls accept Cash and LankaQR. Large stores accept cards.
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="chatbubble-ellipses" size={16} color="#3B82F6" />
            <Text style={[styles.tipItemText, { color: theme.textSecondary }]}>
              <Text style={{ fontWeight: '700', color: theme.text }}>
                Inquiry:
              </Text>{' '}
              Use the WhatsApp button in this app to check stock before
              visiting!
            </Text>
          </View>
        </View>

        {/* Street Cards */}
        <Text style={[styles.sectionHeading, { color: theme.text, marginTop: 8 }]}>
          Explore by Street
        </Text>

        {PETTAH_GUIDES.map((street, idx) => (
          <View
            key={idx}
            style={[
              styles.streetCard,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}>
            <View style={styles.streetHeader}>
              <View
                style={[
                  styles.iconWrap,
                  { backgroundColor: theme.backgroundElement },
                ]}>
                <Ionicons name={street.icon} size={22} color={theme.primary} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={[styles.streetName, { color: theme.text }]}>
                  {street.name}
                </Text>
                <Text
                  style={[styles.streetCategory, { color: theme.secondary }]}>
                  {street.category}
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.exploreStreetBtn,
                  { backgroundColor: theme.primary },
                ]}
                onPress={() => handleStreetSelect(street.name)}>
                <Text style={styles.exploreStreetBtnText}>View</Text>
                <Ionicons name="arrow-forward" size={12} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={[styles.streetDesc, { color: theme.textSecondary }]}>
              {street.description}
            </Text>

            <View
              style={[
                styles.streetTipBox,
                { backgroundColor: theme.backgroundElement },
              ]}>
              <Ionicons
                name="information-circle-outline"
                size={14}
                color={theme.primary}
              />
              <Text
                style={[styles.streetTipText, { color: theme.textSecondary }]}>
                {street.tip}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
  },
  content: {
    padding: 16,
    gap: 14,
    paddingBottom: 36,
  },
  bannerCard: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 4,
  },
  bannerDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  tipsCard: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 10,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  tipItemText: {
    fontSize: 12,
    flex: 1,
    lineHeight: 17,
  },
  streetCard: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
  },
  streetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streetName: {
    fontSize: 15,
    fontWeight: '800',
  },
  streetCategory: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 1,
  },
  exploreStreetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  exploreStreetBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  streetDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  streetTipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
    borderRadius: 8,
  },
  streetTipText: {
    fontSize: 11,
    flex: 1,
  },
});
