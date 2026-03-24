import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

interface Props {
  title: string;
  imageUri: string;
  logoUri: string;
  minOrder: string;
  deliveryTime: string;
  rating: string;
  onPress: () => void;
}

export function RestaurantCard({ title, imageUri, logoUri, minOrder, deliveryTime, rating, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.coverImage} />
        {/* Logo Badge */}
        <View style={styles.logoBadge}>
          <Image source={{ uri: logoUri }} style={styles.logoImage} />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.textStack}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{minOrder}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{deliveryTime}</Text>
            </View>
          </View>
        </View>

        <View style={styles.ratingBadge}>
          <MaterialIcons name="star" size={14} color="#F97316" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: '#F2F4F6',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
    ...theme.shadows.light,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  logoBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    width: 64,
    height: 64,
    backgroundColor: '#FFF',
    borderRadius: 32,
    padding: 2,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    overflow: 'hidden',
    ...theme.shadows.light,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textStack: {
    flex: 1,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#F2F4F6', // surface-container-low
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#475569',
    letterSpacing: 0.5,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED', // orange-50
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#C2410C', // orange-700
  },
});
