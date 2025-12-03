
import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Platform,
  Modal
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";

interface TrainingEntry {
  id: string;
  dogName: string;
  date: string;
  activity: string;
  notes: string;
  duration: string;
  success: 'high' | 'medium' | 'low';
}

export default function TrainingLogScreen() {
  const [entries, setEntries] = useState<TrainingEntry[]>([
    {
      id: '1',
      dogName: 'Max',
      date: '2024-01-15',
      activity: 'Leash Training',
      notes: 'Practiced loose leash walking in the park. Max showed improvement with fewer pulls.',
      duration: '30 min',
      success: 'high'
    },
    {
      id: '2',
      dogName: 'Bella',
      date: '2024-01-14',
      activity: 'Scent Work',
      notes: 'Introduced basic scent detection games. Bella was very engaged and found treats quickly.',
      duration: '15 min',
      success: 'high'
    }
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<TrainingEntry>>({
    dogName: '',
    activity: '',
    notes: '',
    duration: '',
    success: 'medium'
  });

  const handleAddEntry = () => {
    console.log('Adding new entry');
    if (!newEntry.dogName || !newEntry.activity) {
      console.log('Missing required fields');
      return;
    }

    const entry: TrainingEntry = {
      id: Date.now().toString(),
      dogName: newEntry.dogName || '',
      date: new Date().toISOString().split('T')[0],
      activity: newEntry.activity || '',
      notes: newEntry.notes || '',
      duration: newEntry.duration || '',
      success: newEntry.success || 'medium'
    };

    setEntries([entry, ...entries]);
    setNewEntry({
      dogName: '',
      activity: '',
      notes: '',
      duration: '',
      success: 'medium'
    });
    setShowAddModal(false);
    console.log('Entry added successfully');
  };

  const handleDeleteEntry = (id: string) => {
    console.log('Deleting entry:', id);
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const getSuccessColor = (success: string) => {
    switch (success) {
      case 'high':
        return colors.highlight;
      case 'medium':
        return colors.accent;
      case 'low':
        return colors.secondary;
      default:
        return colors.textSecondary;
    }
  };

  const getSuccessIcon = (success: string) => {
    switch (success) {
      case 'high':
        return 'sentiment-very-satisfied';
      case 'medium':
        return 'sentiment-satisfied';
      case 'low':
        return 'sentiment-dissatisfied';
      default:
        return 'sentiment-neutral';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Training Log</Text>
            <Text style={styles.subtitle}>Track your training sessions</Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => {
              console.log('Opening add modal');
              setShowAddModal(true);
            }}
          >
            <IconSymbol 
              ios_icon_name="plus" 
              android_material_icon_name="add" 
              size={24} 
              color={colors.card} 
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          {entries.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol 
                ios_icon_name="book.closed" 
                android_material_icon_name="menu-book" 
                size={64} 
                color={colors.textSecondary} 
              />
              <Text style={styles.emptyText}>No training entries yet</Text>
              <Text style={styles.emptySubtext}>
                Tap the + button to add your first entry
              </Text>
            </View>
          ) : (
            entries.map((entry, index) => (
              <React.Fragment key={index}>
                <View style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <View style={styles.entryHeaderLeft}>
                      <IconSymbol 
                        ios_icon_name="pawprint.fill" 
                        android_material_icon_name="pets" 
                        size={24} 
                        color={colors.primary} 
                      />
                      <View style={styles.entryHeaderText}>
                        <Text style={styles.dogName}>{entry.dogName}</Text>
                        <Text style={styles.date}>{entry.date}</Text>
                      </View>
                    </View>
                    <TouchableOpacity 
                      onPress={() => handleDeleteEntry(entry.id)}
                      style={styles.deleteButton}
                    >
                      <IconSymbol 
                        ios_icon_name="trash" 
                        android_material_icon_name="delete" 
                        size={20} 
                        color={colors.secondary} 
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.activityRow}>
                    <Text style={styles.activityLabel}>Activity:</Text>
                    <Text style={styles.activityText}>{entry.activity}</Text>
                  </View>

                  {entry.duration && (
                    <View style={styles.durationRow}>
                      <IconSymbol 
                        ios_icon_name="clock" 
                        android_material_icon_name="schedule" 
                        size={16} 
                        color={colors.textSecondary} 
                      />
                      <Text style={styles.durationText}>{entry.duration}</Text>
                    </View>
                  )}

                  {entry.notes && (
                    <Text style={styles.notes}>{entry.notes}</Text>
                  )}

                  <View style={[styles.successBadge, { backgroundColor: getSuccessColor(entry.success) }]}>
                    <IconSymbol 
                      ios_icon_name="star.fill" 
                      android_material_icon_name={getSuccessIcon(entry.success)} 
                      size={16} 
                      color={colors.text} 
                    />
                    <Text style={styles.successText}>
                      {entry.success.charAt(0).toUpperCase() + entry.success.slice(1)} Success
                    </Text>
                  </View>
                </View>
              </React.Fragment>
            ))
          )}
        </ScrollView>
      </View>

      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Training Entry</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <IconSymbol 
                  ios_icon_name="xmark" 
                  android_material_icon_name="close" 
                  size={24} 
                  color={colors.text} 
                />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll}>
              <Text style={styles.inputLabel}>Dog Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter dog name"
                placeholderTextColor={colors.textSecondary}
                value={newEntry.dogName}
                onChangeText={(text) => setNewEntry({...newEntry, dogName: text})}
              />

              <Text style={styles.inputLabel}>Activity *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Leash Training, Sit Command"
                placeholderTextColor={colors.textSecondary}
                value={newEntry.activity}
                onChangeText={(text) => setNewEntry({...newEntry, activity: text})}
              />

              <Text style={styles.inputLabel}>Duration</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 30 min"
                placeholderTextColor={colors.textSecondary}
                value={newEntry.duration}
                onChangeText={(text) => setNewEntry({...newEntry, duration: text})}
              />

              <Text style={styles.inputLabel}>Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Add any observations or notes"
                placeholderTextColor={colors.textSecondary}
                value={newEntry.notes}
                onChangeText={(text) => setNewEntry({...newEntry, notes: text})}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />

              <Text style={styles.inputLabel}>Success Level</Text>
              <View style={styles.successButtons}>
                {(['high', 'medium', 'low'] as const).map((level, index) => (
                  <React.Fragment key={index}>
                    <TouchableOpacity
                      style={[
                        styles.successButton,
                        newEntry.success === level && styles.successButtonActive,
                        { borderColor: getSuccessColor(level) }
                      ]}
                      onPress={() => setNewEntry({...newEntry, success: level})}
                    >
                      <Text style={[
                        styles.successButtonText,
                        newEntry.success === level && styles.successButtonTextActive
                      ]}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  </React.Fragment>
                ))}
              </View>

              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleAddEntry}
              >
                <Text style={styles.saveButtonText}>Save Entry</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 48 : 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  addButton: {
    backgroundColor: colors.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 8px rgba(100, 149, 237, 0.3)',
    elevation: 3,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  entryCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  entryHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  entryHeaderText: {
    marginLeft: 12,
  },
  dogName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  deleteButton: {
    padding: 8,
  },
  activityRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  activityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginRight: 8,
  },
  activityText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  durationText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  notes: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  successText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.textSecondary + '40',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  modalScroll: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
  },
  textArea: {
    minHeight: 100,
  },
  successButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  successButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    backgroundColor: colors.card,
  },
  successButtonActive: {
    backgroundColor: colors.primary + '20',
  },
  successButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  successButtonTextActive: {
    color: colors.primary,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    boxShadow: '0px 2px 8px rgba(100, 149, 237, 0.3)',
    elevation: 3,
  },
  saveButtonText: {
    color: colors.card,
    fontSize: 18,
    fontWeight: '600',
  },
});
