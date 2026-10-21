import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  useColorScheme,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { CartItem } from '@/types';

export default function CartScreen() {
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const router = useRouter();

  const {
    cart,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
    shops,
  } = useApp();

  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>(
    'pickup'
  );

  const deliveryFee = deliveryMethod === 'delivery' ? 450 : 0;
  const finalTotal = cartTotal + deliveryFee;

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;

    let message = `*🛒 PETTAHBAZAAR ORDER REQUEST*\n`;
    message += `───────────────────\n`;

    cart.forEach((item, index) => {
      const shop = shops.find((s) => s.id === item.product.shopId);
      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   • Size: ${item.selectedSize} | Color: ${item.selectedColor}\n`;
      message += `   • Qty: ${item.quantity} x Rs. ${item.product.price.toLocaleString()}\n`;
      message += `   • Stall: ${shop?.name || 'Pettah Merchant'} (${shop?.area || 'Pettah'})\n\n`;
    });

    message += `───────────────────\n`;
    message += `*Items Subtotal:* Rs. ${cartTotal.toLocaleString()}\n`;
    message += `*Fulfillment:* ${
      deliveryMethod === 'pickup'
        ? 'Stall Pickup (Free)'
        : 'Islandwide Delivery (+Rs. 450)'
    }\n`;
    message += `*Total Amount:* Rs. ${finalTotal.toLocaleString()}\n`;
    message += `───────────────────\n`;
    message += `Please confirm availability and stall pickup/delivery details. Thank you!`;

    const encodedMsg = encodeURIComponent(message);
    // Use first merchant WhatsApp or default Pettah helpline
    const firstShop = shops.find((s) => s.id === cart[0]?.product.shopId);
    const targetNumber = (firstShop?.whatsapp || '+94772345678').replace(
      /[^0-9]/g,
      ''
    );

    Linking.openURL(`https://wa.me/${targetNumber}?text=${encodedMsg}`).catch(
      () => {
        Alert.alert(
          'WhatsApp not available',
          'Please ensure WhatsApp is installed on your device.'
        );
      }
    );
  };

  const renderCartItem = ({ item }: { item: CartItem }) => {
    const shop = shops.find((s) => s.id === item.product.shopId);

    return (
      <View
        style={[
          styles.itemCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}>
        <Image
          source={{
            uri: item.product.images[0] || 'https://picsum.photos/200/200',
          }}
          style={styles.itemImage}
        />

        <View style={styles.itemDetails}>
          <Text
            numberOfLines={1}
            style={[styles.itemName, { color: theme.text }]}>
            {item.product.name}
          </Text>

          {shop && (
            <Text
              numberOfLines={1}
              style={[styles.itemShop, { color: theme.textSecondary }]}>
              {shop.name} • {shop.area}
            </Text>
          )}

          <View style={styles.specsRow}>
            <View style={[styles.specBadge, { backgroundColor: theme.backgroundElement }]}>
              <Text style={[styles.specBadgeText, { color: theme.textSecondary }]}>
                Size: {item.selectedSize}
              </Text>
            </View>
            <View style={[styles.specBadge, { backgroundColor: theme.backgroundElement }]}>
              <Text style={[styles.specBadgeText, { color: theme.textSecondary }]}>
                {item.selectedColor}
              </Text>
            </View>
          </View>

          <View style={styles.priceAndQtyRow}>
            <Text style={[styles.itemPrice, { color: theme.primary }]}>
              Rs. {(item.product.price * item.quantity).toLocaleString()}
            </Text>

            <View
              style={[
                styles.qtyController,
                {
                  borderColor: theme.border,
                  backgroundColor: theme.backgroundElement,
                },
              ]}>
              <TouchableOpacity
                onPress={() =>
                  updateQuantity(
                    item.product.id,
                    item.quantity - 1,
                    item.selectedSize,
                    item.selectedColor
                  )
                }
                style={styles.qtyBtn}>
                <Ionicons name="remove" size={14} color={theme.text} />
              </TouchableOpacity>

              <Text style={[styles.qtyNumber, { color: theme.text }]}>
                {item.quantity}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  updateQuantity(
                    item.product.id,
                    item.quantity + 1,
                    item.selectedSize,
                    item.selectedColor
                  )
                }
                style={styles.qtyBtn}>
                <Ionicons name="add" size={14} color={theme.text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() =>
            removeFromCart(
              item.product.id,
              item.selectedSize,
              item.selectedColor
            )
          }
          style={styles.deleteBtn}>
          <Ionicons name="trash-outline" size={16} color="#EF4444" />
        </TouchableOpacity>
      </View>
    );
  };

  if (cart.length === 0) {
    return (
      <SafeAreaView
        style={[styles.emptySafe, { backgroundColor: theme.background }]}
        edges={['top']}>
        <Ionicons name="cart-outline" size={80} color={theme.textSecondary} />
        <Text style={[styles.emptyTitle, { color: theme.text }]}>
          Your Bazaar cart is empty
        </Text>
        <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
          Explore shops in Pettah and add shoes, electronics, clothes and more.
        </Text>
        <TouchableOpacity
          style={[styles.exploreBtn, { backgroundColor: theme.primary }]}
          onPress={() => router.push('/(tabs)')}>
          <Ionicons name="bag-handle-outline" size={18} color="#FFFFFF" />
          <Text style={styles.exploreBtnText}>Start Shopping in Pettah</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
      edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <View style={styles.headerLeft}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Bazaar Bag
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            {cart.length} item{cart.length > 1 ? 's' : ''} from Pettah merchants
          </Text>
        </View>

        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Cart Items List */}
        <FlatList
          data={cart}
          scrollEnabled={false}
          keyExtractor={(item) =>
            `${item.product.id}-${item.selectedSize}-${item.selectedColor}`
          }
          renderItem={renderCartItem}
          contentContainerStyle={styles.itemsList}
        />

        {/* Fulfillment Option */}
        <View
          style={[
            styles.sectionCard,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Fulfillment Method
          </Text>
          <View style={styles.deliveryToggleRow}>
            <TouchableOpacity
              style={[
                styles.toggleOption,
                deliveryMethod === 'pickup' && {
                  backgroundColor: theme.primary,
                  borderColor: theme.primary,
                },
              ]}
              onPress={() => setDeliveryMethod('pickup')}>
              <Ionicons
                name="storefront-outline"
                size={18}
                color={deliveryMethod === 'pickup' ? '#FFFFFF' : theme.text}
              />
              <Text
                style={[
                  styles.toggleText,
                  {
                    color:
                      deliveryMethod === 'pickup' ? '#FFFFFF' : theme.text,
                  },
                ]}>
                Stall Pickup (Free)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.toggleOption,
                deliveryMethod === 'delivery' && {
                  backgroundColor: theme.primary,
                  borderColor: theme.primary,
                },
              ]}
              onPress={() => setDeliveryMethod('delivery')}>
              <Ionicons
                name="bicycle-outline"
                size={18}
                color={deliveryMethod === 'delivery' ? '#FFFFFF' : theme.text}
              />
              <Text
                style={[
                  styles.toggleText,
                  {
                    color:
                      deliveryMethod === 'delivery' ? '#FFFFFF' : theme.text,
                  },
                ]}>
                Courier (Rs. 450)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bill Summary */}
        <View
          style={[
            styles.sectionCard,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Order Summary
          </Text>

          <View style={styles.billRow}>
            <Text style={[styles.billLabel, { color: theme.textSecondary }]}>
              Items Subtotal
            </Text>
            <Text style={[styles.billValue, { color: theme.text }]}>
              Rs. {cartTotal.toLocaleString()}
            </Text>
          </View>

          <View style={styles.billRow}>
            <Text style={[styles.billLabel, { color: theme.textSecondary }]}>
              {deliveryMethod === 'pickup' ? 'Stall Pickup' : 'Courier Fee'}
            </Text>
            <Text
              style={[
                styles.billValue,
                { color: deliveryFee === 0 ? theme.secondary : theme.text },
              ]}>
              {deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.billRow}>
            <Text style={[styles.totalLabel, { color: theme.text }]}>
              Grand Total
            </Text>
            <Text style={[styles.totalValue, { color: theme.primary }]}>
              Rs. {finalTotal.toLocaleString()}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Bottom Bar */}
      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: theme.card,
            borderTopColor: theme.border,
          },
        ]}>
        <View>
          <Text style={[styles.bottomTotalLabel, { color: theme.textSecondary }]}>
            Total Payable
          </Text>
          <Text style={[styles.bottomTotalVal, { color: theme.primary }]}>
            Rs. {finalTotal.toLocaleString()}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={handleCheckoutWhatsApp}>
          <Ionicons name="logo-whatsapp" size={20} color="#FFFFFF" />
          <Text style={styles.checkoutBtnText}>Send Order to WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {},
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  clearText: {
    fontSize: 13,
    color: '#EF4444',
    fontWeight: '600',
  },
  scrollContent: {
    padding: 16,
    gap: 14,
    paddingBottom: 100,
  },
  itemsList: {
    gap: 12,
  },
  itemCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    position: 'relative',
    gap: 12,
  },
  itemImage: {
    width: 76,
    height: 76,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    paddingRight: 24,
  },
  itemShop: {
    fontSize: 11,
    marginTop: 2,
  },
  specsRow: {
    flexDirection: 'row',
    gap: 6,
    marginVertical: 6,
  },
  specBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  specBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  priceAndQtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
  },
  qtyController: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
  },
  qtyBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  qtyNumber: {
    fontSize: 12,
    fontWeight: '700',
    minWidth: 18,
    textAlign: 'center',
  },
  deleteBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  sectionCard: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  deliveryToggleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  toggleOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '700',
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  billLabel: {
    fontSize: 13,
  },
  billValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '900',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  bottomTotalLabel: {
    fontSize: 11,
  },
  bottomTotalVal: {
    fontSize: 17,
    fontWeight: '900',
  },
  checkoutBtn: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 12,
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  emptySafe: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  exploreBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
