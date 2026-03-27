import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

type IssueModalProps = {
  visible: boolean;
  onClose: () => void;
};

const ISSUES = [
  { id: '1', title: 'Müşteriye Ulaşılamıyor', icon: 'person-off' },
  { id: '2', title: 'Araç Arızası / Kaza', icon: 'car-repair' },
  { id: '3', title: 'Hatalı Teslimat Adresi', icon: 'wrong-location' },
  { id: '4', title: 'Mağaza Kapalı / Sorunlu', icon: 'store-mall-directory' },
];

export function DeliveryIssueModal({ visible, onClose }: IssueModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sheet}>
              <View style={styles.handle} />
              
              <Text style={styles.title}>Sorun Bildir</Text>
              <Text style={styles.subtitle}>Siparişle ilgili yaşadığınız sorunu seçin.</Text>

              <View style={styles.issuesList}>
                {ISSUES.map(issue => (
                  <TouchableOpacity key={issue.id} style={styles.issueItem} onPress={onClose}>
                    <View style={styles.iconCircle}>
                      <MaterialIcons name={issue.icon as any} size={24} color="#475569" />
                    </View>
                    <Text style={styles.issueText}>{issue.title}</Text>
                    <MaterialIcons name="chevron-right" size={24} color="#94A3B8" />
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.supportBtn}>
                <MaterialIcons name="headset-mic" size={20} color="#FFF" />
                <Text style={styles.supportText}>Canlı Desteğe Bağlan</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textSecondary,
    marginBottom: 32,
  },
  issuesList: {
    gap: 16,
    marginBottom: 32,
  },
  issueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  issueText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  supportBtn: {
    backgroundColor: theme.colors.primary,
    height: 64,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  supportText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
