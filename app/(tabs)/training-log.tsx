
import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Platform,
  Modal,
  Image,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import * as ImagePicker from 'expo-image-picker';

interface TrainingEntry {
  id: string;
  dogName: string;
  date: string;
  activity: string;
  notes: string;
  duration: string;
  success: 'high' | 'medium' | 'low';
  photos?: string[];
  goals?: string;
  nextSteps?: string;
}

const activityTypes = [
  'Leash Training',
  'Obedience',
  'Scent Work',
  'Agility',
  'Socialization',
  'Trick Training',
  'Behavioral Modification',
  'Recall Training',
  'Crate Training',
  'Other'
];

export default function TrainingLogScreen() {
  const [entries, setEntries] = useState<TrainingEntry[]>([
    {
      id: '1',
      dogName: 'Max',
      date: '2024-01-15',
      activity: 'Leash Training',
      notes: 'Practiced loose leash walking in the park. Max showed significant improvement with fewer pulls. Used high-value treats and the stop-and-go method.',
      duration: '30 min',
      success: 'high',
      goals: 'Walk entire block without pulling',
      nextSteps: 'Practice in more distracting environment'
    },
    {
      id: '2',
      dogName: 'Bella',
      date: '2024-01-14',
      activity: 'Scent Work',
      notes: 'Introduced basic scent detection games using treats hidden in boxes. Bella was very engaged and found treats quickly. Started with 3 boxes, progressed to 5.',
      duration: '15 min',
      success: 'high',
      goals: 'Find hidden treats in 5 boxes',
      nextSteps: 'Introduce essential oil scents'
    }
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<TrainingEntry | null>(null);
  const [newEntry, setNewEntry] = useState<Partial<TrainingEntry>>({
    dogName: '',
    activity: '',
    notes: '',
    duration: '',
    success: 'medium',
    photos: [],
    goals: '',
    nextSteps: ''
  });
  const [filterSuccess, setFilterSuccess] = useState<string>('all');

  const handleAddEntry = () => {
    console.log('Adding new entry');
    if (!newEntry.dogName || !newEntry.activity) {
      Alert.alert('Missing Information', 'Please enter dog name and activity type.');
      return;
    }

    const entry: TrainingEntry = {
      id: Date.now().toString(),
      dogName: newEntry.dogName || '',
      date: new Date().toISOString().split('T')[0],
      activity: newEntry.activity || '',
      notes: newEntry.notes || '',
      duration: newEntry.duration || '',
      success: newEntry.success || 'medium',
      photos: newEntry.photos || [],
      goals: newEntry.goals || '',
      nextSteps: newEntry.nextSteps || ''
    };

    setEntries([entry, ...entries]);
    setNewEntry({
      dogName: '',
      activity: '',
      notes: '',
      duration: '',
      success: 'medium',
      photos: [],
      goals: '',
      nextSteps: ''
    });
    setShowAddModal(false);
    console.log('Entry added successfully');
  };

  const handleDeleteEntry = (id: string) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this training entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            console.log('Deleting entry:', id);
            setEntries(entries.filter(entry => entry.id !== id));
            setShowDetailModal(false);
          }
        }
      ]
    );
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets) {
      const newPhotos = result.assets.map(asset => asset.uri);
      setNewEntry({
        ...newEntry,
        photos: [...(newEntry.photos || []), ...newPhotos]
      });
      console.log('Photos added:', newPhotos.length);
    }
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = [...(newEntry.photos || [])];
    updatedPhotos.splice(index, 1);
    setNewEntry({ ...newEntry, photos: updatedPhotos });
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

  const filteredEntries = filterSuccess === 'all' 
    ? entries 
    : entries.filter(entry => entry.success === filterSuccess);

  const getStats = () => {
    const total = entries.length;
    const high = entries.filter(e => e.success === 'high').length;
    const medium = entries.filter(e => e.success === 'medium').length;
    const low = entries.filter(e => e.success === 'low').length;
    return { total, high, medium, low };
  };

  const stats = getStats();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Training Log</Text>
            <Text style={styles.subtitle}>Track progress & celebrate wins</Text>
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

        {entries.length > 0 && (
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.total}</Text>
              <Text style={styles.statLabel}>Total Sessions</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.highlight + '30' }]}>
              <Text style={styles.statNumber}>{stats.high}</Text>
              <Text style={styles.statLabel}>High Success</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.accent + '30' }]}>
              <Text style={styles.statNumber}>{stats.medium}</Text>
              <Text style={styles.statLabel}>Medium</Text>
            </View>
          </View>
        )}

        {entries.length > 0 && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer}
            contentContainerStyle={styles.filterContent}
          >
            {[
              { label: 'All', value: 'all' },
              { label: 'High Success', value: 'high' },
              { label: 'Medium', value: 'medium' },
              { label: 'Low', value: 'low' }
            ].map((filter, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    filterSuccess === filter.value && styles.filterButtonActive
                  ]}
                  onPress={() => setFilterSuccess(filter.value)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    filterSuccess === filter.value && styles.filterButtonTextActive
                  ]}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </ScrollView>
        )}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          {filteredEntries.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol 
                ios_icon_name="book.closed" 
                android_material_icon_name="menu-book" 
                size={64} 
                color={colors.textSecondary} 
              />
              <Text style={styles.emptyText}>
                {entries.length === 0 ? 'No training entries yet' : 'No entries match filter'}
              </Text>
              <Text style={styles.emptySubtext}>
                {entries.length === 0 
                  ? 'Tap the + button to add your first entry'
                  : 'Try selecting a different filter'}
              </Text>
            </View>
          ) : (
            filteredEntries.map((entry, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity 
                  style={styles.entryCard}
                  onPress={() => {
                    setSelectedEntry(entry);
                    setShowDetailModal(true);
                  }}
                >
                  <View style={styles.entryHeader}>
                    <View style={styles.entryHeaderLeft}>
                      <View style={[styles.iconCircle, { backgroundColor: getSuccessColor(entry.success) + '30' }]}>
                        <IconSymbol 
                          ios_icon_name="pawprint.fill" 
                          android_material_icon_name="pets" 
                          size={24} 
                          color={getSuccessColor(entry.success)} 
                        />
                      </View>
                      <View style={styles.entryHeaderText}>
                        <Text style={styles.dogName}>{entry.dogName}</Text>
                        <Text style={styles.date}>{entry.date}</Text>
                      </View>
                    </View>
                    <View style={[styles.successBadge, { backgroundColor: getSuccessColor(entry.success) }]}>
                      <IconSymbol 
                        ios_icon_name="star.fill" 
                        android_material_icon_name={getSuccessIcon(entry.success)} 
                        size={14} 
                        color={colors.text} 
                      />
                    </View>
                  </View>

                  <View style={styles.activityRow}>
                    <IconSymbol 
                      ios_icon_name="figure.walk" 
                      android_material_icon_name="directions-walk" 
                      size={16} 
                      color={colors.primary} 
                    />
                    <Text style={styles.activityText}>{entry.activity}</Text>
                    {entry.duration && (
                      <>
                        <IconSymbol 
                          ios_icon_name="clock" 
                          android_material_icon_name="schedule" 
                          size={14} 
                          color={colors.textSecondary} 
                        />
                        <Text style={styles.durationText}>{entry.duration}</Text>
                      </>
                    )}
                  </View>

                  {entry.notes && (
                    <Text style={styles.notes} numberOfLines={2}>{entry.notes}</Text>
                  )}

                  {entry.photos && entry.photos.length > 0 && (
                    <View style={styles.photoPreview}>
                      <IconSymbol 
                        ios_icon_name="photo.fill" 
                        android_material_icon_name="photo" 
                        size={16} 
                        color={colors.primary} 
                      />
                      <Text style={styles.photoCount}>{entry.photos.length} photo{entry.photos.length > 1 ? 's' : ''}</Text>
                    </View>
                  )}

                  <View style={styles.viewMoreRow}>
                    <Text style={styles.viewMoreText}>Tap to view details</Text>
                    <IconSymbol 
                      ios_icon_name="chevron.right" 
                      android_material_icon_name="chevron-right" 
                      size={16} 
                      color={colors.primary} 
                    />
                  </View>
                </TouchableOpacity>
              </React.Fragment>
            ))
          )}
        </ScrollView>
      </View>

      {/* Add Entry Modal */}
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
                  ios_icon_name="xmark.circle.fill" 
                  android_material_icon_name="cancel" 
                  size={28} 
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

              <Text style={styles.inputLabel}>Activity Type *</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.activityTypeScroll}
              >
                {activityTypes.map((type, index) => (
                  <React.Fragment key={index}>
                    <TouchableOpacity
                      style={[
                        styles.activityTypeButton,
                        newEntry.activity === type && styles.activityTypeButtonActive
                      ]}
                      onPress={() => setNewEntry({...newEntry, activity: type})}
                    >
                      <Text style={[
                        styles.activityTypeText,
                        newEntry.activity === type && styles.activityTypeTextActive
                      ]}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  </React.Fragment>
                ))}
              </ScrollView>

              <Text style={styles.inputLabel}>Duration</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 30 min"
                placeholderTextColor={colors.textSecondary}
                value={newEntry.duration}
                onChangeText={(text) => setNewEntry({...newEntry, duration: text})}
              />

              <Text style={styles.inputLabel}>Training Goals</Text>
              <TextInput
                style={styles.input}
                placeholder="What did you want to achieve?"
                placeholderTextColor={colors.textSecondary}
                value={newEntry.goals}
                onChangeText={(text) => setNewEntry({...newEntry, goals: text})}
              />

              <Text style={styles.inputLabel}>Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Add observations, what worked, challenges..."
                placeholderTextColor={colors.textSecondary}
                value={newEntry.notes}
                onChangeText={(text) => setNewEntry({...newEntry, notes: text})}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />

              <Text style={styles.inputLabel}>Next Steps</Text>
              <TextInput
                style={styles.input}
                placeholder="What to work on next session?"
                placeholderTextColor={colors.textSecondary}
                value={newEntry.nextSteps}
                onChangeText={(text) => setNewEntry({...newEntry, nextSteps: text})}
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
                      <IconSymbol 
                        ios_icon_name="star.fill" 
                        android_material_icon_name={getSuccessIcon(level)} 
                        size={20} 
                        color={newEntry.success === level ? getSuccessColor(level) : colors.textSecondary} 
                      />
                      <Text style={[
                        styles.successButtonText,
                        newEntry.success === level && { color: getSuccessColor(level) }
                      ]}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  </React.Fragment>
                ))}
              </View>

              <Text style={styles.inputLabel}>Photos (Optional)</Text>
              <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
                <IconSymbol 
                  ios_icon_name="photo.badge.plus" 
                  android_material_icon_name="add-photo-alternate" 
                  size={24} 
                  color={colors.primary} 
                />
                <Text style={styles.photoButtonText}>Add Photos</Text>
              </TouchableOpacity>

              {newEntry.photos && newEntry.photos.length > 0 && (
                <ScrollView horizontal style={styles.photoPreviewScroll}>
                  {newEntry.photos.map((photo, index) => (
                    <React.Fragment key={index}>
                      <View style={styles.photoPreviewItem}>
                        <Image source={{ uri: photo }} style={styles.photoPreviewImage} />
                        <TouchableOpacity 
                          style={styles.removePhotoButton}
                          onPress={() => removePhoto(index)}
                        >
                          <IconSymbol 
                            ios_icon_name="xmark.circle.fill" 
                            android_material_icon_name="cancel" 
                            size={24} 
                            color={colors.secondary} 
                          />
                        </TouchableOpacity>
                      </View>
                    </React.Fragment>
                  ))}
                </ScrollView>
              )}

              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleAddEntry}
              >
                <IconSymbol 
                  ios_icon_name="checkmark.circle.fill" 
                  android_material_icon_name="check-circle" 
                  size={24} 
                  color={colors.card} 
                />
                <Text style={styles.saveButtonText}>Save Entry</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Detail Modal */}
      <Modal
        visible={showDetailModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDetailModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedEntry && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedEntry.dogName}</Text>
                  <View style={styles.modalHeaderButtons}>
                    <TouchableOpacity 
                      onPress={() => handleDeleteEntry(selectedEntry.id)}
                      style={styles.deleteIconButton}
                    >
                      <IconSymbol 
                        ios_icon_name="trash.fill" 
                        android_material_icon_name="delete" 
                        size={24} 
                        color={colors.secondary} 
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowDetailModal(false)}>
                      <IconSymbol 
                        ios_icon_name="xmark.circle.fill" 
                        android_material_icon_name="cancel" 
                        size={28} 
                        color={colors.text} 
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <ScrollView style={styles.modalScroll}>
                  <View style={styles.detailSection}>
                    <View style={styles.detailRow}>
                      <IconSymbol 
                        ios_icon_name="calendar" 
                        android_material_icon_name="event" 
                        size={20} 
                        color={colors.primary} 
                      />
                      <Text style={styles.detailLabel}>Date:</Text>
                      <Text style={styles.detailValue}>{selectedEntry.date}</Text>
                    </View>

                    <View style={styles.detailRow}>
                      <IconSymbol 
                        ios_icon_name="figure.walk" 
                        android_material_icon_name="directions-walk" 
                        size={20} 
                        color={colors.primary} 
                      />
                      <Text style={styles.detailLabel}>Activity:</Text>
                      <Text style={styles.detailValue}>{selectedEntry.activity}</Text>
                    </View>

                    {selectedEntry.duration && (
                      <View style={styles.detailRow}>
                        <IconSymbol 
                          ios_icon_name="clock" 
                          android_material_icon_name="schedule" 
                          size={20} 
                          color={colors.primary} 
                        />
                        <Text style={styles.detailLabel}>Duration:</Text>
                        <Text style={styles.detailValue}>{selectedEntry.duration}</Text>
                      </View>
                    )}

                    <View style={styles.detailRow}>
                      <IconSymbol 
                        ios_icon_name="star.fill" 
                        android_material_icon_name={getSuccessIcon(selectedEntry.success)} 
                        size={20} 
                        color={getSuccessColor(selectedEntry.success)} 
                      />
                      <Text style={styles.detailLabel}>Success:</Text>
                      <View style={[styles.successBadge, { backgroundColor: getSuccessColor(selectedEntry.success) }]}>
                        <Text style={styles.successText}>
                          {selectedEntry.success.charAt(0).toUpperCase() + selectedEntry.success.slice(1)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {selectedEntry.goals && (
                    <View style={styles.detailCard}>
                      <View style={styles.detailCardHeader}>
                        <IconSymbol 
                          ios_icon_name="target" 
                          android_material_icon_name="flag" 
                          size={20} 
                          color={colors.accent} 
                        />
                        <Text style={styles.detailCardTitle}>Training Goals</Text>
                      </View>
                      <Text style={styles.detailCardText}>{selectedEntry.goals}</Text>
                    </View>
                  )}

                  {selectedEntry.notes && (
                    <View style={styles.detailCard}>
                      <View style={styles.detailCardHeader}>
                        <IconSymbol 
                          ios_icon_name="note.text" 
                          android_material_icon_name="notes" 
                          size={20} 
                          color={colors.primary} 
                        />
                        <Text style={styles.detailCardTitle}>Notes</Text>
                      </View>
                      <Text style={styles.detailCardText}>{selectedEntry.notes}</Text>
                    </View>
                  )}

                  {selectedEntry.nextSteps && (
                    <View style={styles.detailCard}>
                      <View style={styles.detailCardHeader}>
                        <IconSymbol 
                          ios_icon_name="arrow.right.circle.fill" 
                          android_material_icon_name="arrow-circle-right" 
                          size={20} 
                          color={colors.highlight} 
                        />
                        <Text style={styles.detailCardTitle}>Next Steps</Text>
                      </View>
                      <Text style={styles.detailCardText}>{selectedEntry.nextSteps}</Text>
                    </View>
                  )}

                  {selectedEntry.photos && selectedEntry.photos.length > 0 && (
                    <View style={styles.detailCard}>
                      <View style={styles.detailCardHeader}>
                        <IconSymbol 
                          ios_icon_name="photo.fill" 
                          android_material_icon_name="photo-library" 
                          size={20} 
                          color={colors.secondary} 
                        />
                        <Text style={styles.detailCardTitle}>Photos</Text>
                      </View>
                      <ScrollView horizontal style={styles.photoGallery}>
                        {selectedEntry.photos.map((photo, index) => (
                          <React.Fragment key={index}>
                            <Image source={{ uri: photo }} style={styles.galleryImage} />
                          </React.Fragment>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </ScrollView>
              </>
            )}
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
    paddingBottom: 16,
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
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 12px rgba(100, 149, 237, 0.4)',
    elevation: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  filterContainer: {
    maxHeight: 50,
    marginBottom: 12,
  },
  filterContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  filterButtonTextActive: {
    color: colors.card,
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
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
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
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  entryHeaderText: {
    marginLeft: 12,
  },
  dogName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  activityText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  durationText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  notes: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  photoPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  photoCount: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  viewMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: 4,
  },
  viewMoreText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  successText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  modalHeaderButtons: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  deleteIconButton: {
    padding: 4,
  },
  modalScroll: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
  },
  textArea: {
    minHeight: 100,
  },
  activityTypeScroll: {
    marginBottom: 8,
  },
  activityTypeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
    marginRight: 8,
  },
  activityTypeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  activityTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  activityTypeTextActive: {
    color: colors.card,
  },
  successButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  successButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: colors.card,
    gap: 6,
  },
  successButtonActive: {
    backgroundColor: colors.background,
  },
  successButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    gap: 10,
  },
  photoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  photoPreviewScroll: {
    marginTop: 12,
  },
  photoPreviewItem: {
    marginRight: 12,
    position: 'relative',
  },
  photoPreviewImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  removePhotoButton: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 40,
    gap: 10,
    boxShadow: '0px 4px 12px rgba(100, 149, 237, 0.4)',
    elevation: 5,
  },
  saveButtonText: {
    color: colors.card,
    fontSize: 18,
    fontWeight: '700',
  },
  detailSection: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    width: 80,
  },
  detailValue: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  detailCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
  },
  detailCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  detailCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  detailCardText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  photoGallery: {
    marginTop: 8,
  },
  galleryImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginRight: 12,
  },
});
