import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, StatusBar, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';
import { useCart } from '../../context/CartContext';
import { OptionGroup, SelectedOption } from '../../types';
import { Modal } from 'react-native';

const { width } = Dimensions.get('window');

const RESTAURANT_ID = 'culinary-curator';
const RESTAURANT_NAME = 'The Culinary Curator';

const MENU_ITEMS = [
  {
    id: 'cc-1',
    title: 'Truffle Infused Tagliatelle',
    description: 'Handmade pasta tossed in cream of white truffle, aged parmesan, and wild forest mushrooms.',
    price: 24.00,
    imageUri: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=400&auto=format&fit=crop',
    optionGroups: [
      {
        id: 'size',
        name: 'Portion Size',
        type: 'SINGLE',
        required: true,
        options: [
          { id: 's1', name: 'Regular', price: 0 },
          { id: 's2', name: 'Large', price: 8 },
        ]
      },
      {
        id: 'extra',
        name: 'Extra Toppings',
        type: 'MULTIPLE',
        options: [
          { id: 'e1', name: 'Extra Parmesan', price: 3 },
          { id: 'e2', name: 'Extra Truffle Oil', price: 5 },
        ]
      }
    ] as OptionGroup[]
  },
  {
    id: 'cc-2',
    title: 'Honey Glazed Miso Salmon',
    description: 'Pan-seared Atlantic salmon with a sweet miso glaze, served over ginger-infused bok choy.',
    price: 28.50,
    imageUri: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=400&auto=format&fit=crop',
    optionGroups: [
      {
        id: 'side',
        name: 'Choose a Side',
        type: 'SINGLE',
        required: true,
        options: [
          { id: 'sd1', name: 'Bok Choy', price: 0 },
          { id: 'sd2', name: 'Steamed Rice', price: 0 },
          { id: 'sd3', name: 'Garlic Mash', price: 4 },
        ]
      }
    ] as OptionGroup[]
  },
  {
    id: 'cc-3',
    title: 'Charred Wagyu Slider Duo',
    description: 'Two mini wagyu beef patties, caramelized onions, gruyère cheese, and truffle aioli on brioche.',
    price: 19.00,
    imageUri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop',
    optionGroups: [
      {
        id: 'patty',
        name: 'Doneness',
        type: 'SINGLE',
        required: true,
        options: [
          { id: 'p1', name: 'Medium rare', price: 0 },
          { id: 'p2', name: 'Medium', price: 0 },
          { id: 'p3', name: 'Well done', price: 0 },
        ]
      }
    ] as OptionGroup[]
  },
];

export function RestaurantMenuScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
  
  const { addItem, itemCount, totalPrice } = useCart();

  const handleOpenDetail = (item: any) => {
    setSelectedItem(item);
    setSelectedOptions([]);
    setModalVisible(true);
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;

    // Check required options
    const missingRequired = selectedItem.optionGroups?.find(
      (g: any) => g.required && !selectedOptions.some(o => o.groupId === g.id)
    );

    if (missingRequired) {
      alert(`Please choose: ${missingRequired.name}`);
      return;
    }

    // Create unique ID based on options
    const optionsHash = selectedOptions
      .sort((a, b) => a.optionId.localeCompare(b.optionId))
      .map(o => o.optionId)
      .join('-');
    const cartId = optionsHash ? `${selectedItem.id}-${optionsHash}` : selectedItem.id;

    addItem({
      id: cartId,
      originalId: selectedItem.id,
      title: selectedItem.title,
      price: selectedItem.price,
      imageUri: selectedItem.imageUri,
      restaurantId: RESTAURANT_ID,
      restaurantName: RESTAURANT_NAME,
      selectedOptions: selectedOptions,
    });

    setModalVisible(false);
  };

  const toggleOption = (group: OptionGroup, option: any) => {
    if (group.type === 'SINGLE') {
      setSelectedOptions(prev => [
        ...prev.filter(o => o.groupId !== group.id),
        {
          groupId: group.id,
          groupName: group.name,
          optionId: option.id,
          optionName: option.name,
          price: option.price
        }
      ]);
    } else {
      const isSelected = selectedOptions.find(o => o.optionId === option.id);
      if (isSelected) {
        setSelectedOptions(prev => prev.filter(o => o.optionId !== option.id));
      } else {
        setSelectedOptions(prev => [
          ...prev,
          {
            groupId: group.id,
            groupName: group.name,
            optionId: option.id,
            optionName: option.name,
            price: option.price
          }
        ]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Top Floating Nav */}
      <View style={[styles.topNav, { top: Math.max(insets.top, 16) }]}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.navActions}>
          <TouchableOpacity style={styles.navButton}>
            <MaterialIcons name="share" size={20} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <MaterialIcons name="favorite-border" size={20} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        
        {/* Hero Header */}
        <View style={styles.heroSection}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop' }} 
            style={styles.heroImage} 
          />
          <View style={styles.heroOverlay}>
            <View style={styles.ratingBadge}>
              <MaterialIcons name="star" size={14} color="#FFF" />
              <Text style={styles.ratingText}>4.9 TOP RATED</Text>
            </View>
            <Text style={styles.restaurantTitle}>The Culinary Curator</Text>
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <MaterialIcons name="schedule" size={16} color="#FFF" />
                <Text style={styles.metaText}>25-35 min</Text>
              </View>
              <View style={styles.metaItem}>
                <MaterialIcons name="location-on" size={16} color="#FFF" />
                <Text style={styles.metaText}>1.2 miles</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          
          {/* Search Bar */}
          <View style={styles.searchRow}>
            <View style={styles.searchInputContainer}>
              <MaterialIcons name="search" size={24} color={theme.colors.textSecondary} />
              <TextInput 
                style={styles.searchInput}
                placeholder="Search menu items..."
                placeholderTextColor={theme.colors.textSecondary}
                value={search}
                onChangeText={setSearch}
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <MaterialIcons name="tune" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Section Title */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Signature Dishes</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>

          {/* Items List */}
          <View style={styles.itemsList}>
            {MENU_ITEMS.map((item) => (
              <View key={item.id} style={styles.menuItem}>
                <View style={styles.itemInfo}>
                  <View>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>
                  </View>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                </View>
                
                <View style={styles.itemImageContainer}>
                  <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
                  <TouchableOpacity
                    style={styles.addButton}
                    activeOpacity={0.8}
                    onPress={() => handleOpenDetail(item)}
                  >
                    <MaterialIcons name="add" size={24} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

        </View>
      </ScrollView>

      {/* Floating Cart CTA */}
      {itemCount > 0 && (
        <View style={[styles.floatingCartContainer, { bottom: Math.max(insets.bottom, 24) }]}>
          <TouchableOpacity style={styles.cartButton} activeOpacity={0.9} onPress={() => navigation.navigate('Checkout')}>
            <View style={styles.cartLeft}>
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{itemCount} {itemCount === 1 ? 'ITEM' : 'ITEMS'}</Text>
              </View>
              <Text style={styles.cartMainText}>Sepeti Gör</Text>
            </View>
            <Text style={styles.cartPriceText}>${totalPrice.toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Product Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedItem?.title}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={24} color={theme.colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalScroll}>
              <Image source={{ uri: selectedItem?.imageUri }} style={styles.modalImage} />
              <Text style={styles.modalDesc}>{selectedItem?.description}</Text>

              {selectedItem?.optionGroups?.map((group: OptionGroup) => (
                <View key={group.id} style={styles.optionGroup}>
                  <View style={styles.groupHeader}>
                    <Text style={styles.groupName}>{group.name}</Text>
                    {group.required && <View style={styles.requiredBadge}><Text style={styles.requiredText}>Zorunlu</Text></View>}
                  </View>
                  
                  {group.options.map(opt => {
                    const isSelected = selectedOptions.some(o => o.optionId === opt.id);
                    return (
                      <TouchableOpacity 
                        key={opt.id} 
                        style={styles.optionRow}
                        onPress={() => toggleOption(group, opt)}
                      >
                        <View style={styles.optionLeft}>
                          <MaterialIcons 
                            name={isSelected ? (group.type === 'SINGLE' ? 'radio-button-checked' : 'check-box') : (group.type === 'SINGLE' ? 'radio-button-unchecked' : 'check-box-outline-blank')} 
                            size={20} 
                            color={isSelected ? theme.colors.primary : theme.colors.textSecondary} 
                          />
                          <Text style={[styles.optionNameText, isSelected && styles.optionNameActive]}>{opt.name}</Text>
                        </View>
                        {opt.price > 0 && <Text style={styles.optionPrice}>+${opt.price.toFixed(2)}</Text>}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.confirmButton} onPress={handleAddToCart}>
                <Text style={styles.confirmButtonText}>Sepete Ekle</Text>
                <Text style={styles.confirmPrice}>
                  ${(selectedItem?.price + selectedOptions.reduce((a, b) => a + b.price, 0))?.toFixed(2)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  topNav: {
    position: 'absolute',
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 100,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.light,
    elevation: 4,
  },
  navActions: {
    flexDirection: 'row',
    gap: 16,
  },
  scrollContent: {
    paddingBottom: 120, // space for floating cart
  },
  heroSection: {
    height: 350,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 48, // space for the notch
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(169, 49, 0, 0.8)', // primary with opacity
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
    gap: 6,
  },
  ratingText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  restaurantTitle: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '500',
  },
  menuSection: {
    backgroundColor: '#F8F9FB', // surface
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24, // overlaps the hero image
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  searchRow: {
    flexDirection: 'row',
    backgroundColor: '#F2F4F6', // surface-container-low
    borderRadius: 20,
    padding: 8,
    gap: 8,
    marginBottom: 32,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // surface-container-lowest
    borderRadius: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: theme.colors.textPrimary,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.primary,
    letterSpacing: 1,
  },
  itemsList: {
    gap: 24,
  },
  menuItem: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(230, 190, 178, 0.1)',
    ...theme.shadows.light,
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 6,
    lineHeight: 22,
  },
  itemDesc: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    marginTop: 12,
  },
  itemImageContainer: {
    width: 110,
    height: 110,
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  floatingCartContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    zIndex: 200,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primary,
    padding: 20,
    borderRadius: 20,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 10,
  },
  cartLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cartBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  cartMainText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  cartPriceText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  modalScroll: {
    paddingBottom: 100,
  },
  modalImage: {
    width: '100%',
    height: 250,
  },
  modalDesc: {
    padding: 24,
    fontSize: 15,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  optionGroup: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  requiredBadge: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  requiredText: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionNameText: {
    fontSize: 15,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  optionNameActive: {
    fontWeight: '700',
    color: theme.colors.primary,
  },
  optionPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textSecondary,
  },
  modalFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  confirmButton: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    padding: 20,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  confirmPrice: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
  },
});
