
import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Platform,
  Switch,
  Alert,
  Linking
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";

interface UserProfile {
  name: string;
  email: string;
  dogs: DogProfile[];
  preferences: UserPreferences;
}

interface DogProfile {
  id: string;
  name: string;
  breed: string;
  age: string;
  trainingGoals: string[];
}

interface UserPreferences {
  notifications: boolean;
  emailUpdates: boolean;
  trainingReminders: boolean;
  darkMode: boolean;
}

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Dog Trainer',
    email: 'trainer@example.com',
    dogs: [
      {
        id: '1',
        name: 'Max',
        breed: 'Golden Retriever',
        age: '5 months',
        trainingGoals: ['Leash Training', 'Basic Obedience', 'Socialization']
      },
      {
        id: '2',
        name: 'Bella',
        breed: 'Border Collie',
        age: '2 years',
        trainingGoals: ['Scent Work', 'Advanced Tricks', 'Agility']
      }
    ],
    preferences: {
      notifications: true,
      emailUpdates: false,
      trainingReminders: true,
      darkMode: false
    }
  });

  const updatePreference = (key: keyof UserPreferences, value: boolean) => {
    setProfile({
      ...profile,
      preferences: {
        ...profile.preferences,
        [key]: value
      }
    });
    console.log(`Updated ${key} to ${value}`);
  };

  const handleAddDog = () => {
    Alert.alert(
      'Add Dog Profile',
      'This feature will allow you to add and manage multiple dog profiles.',
      [{ text: 'OK' }]
    );
  };

  const handleEditProfile = () => {
    Alert.alert(
      'Edit Profile',
      'This feature will allow you to edit your profile information.',
      [{ text: 'OK' }]
    );
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Training Data',
      'Export all your training logs and progress reports.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => console.log('Exporting data...') }
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'Dog Trainer AI 2.0',
      'Version 2.0.0\n\nAn AI-powered dog training assistant that provides research-backed guidance, training logs, and connects you with local service providers.\n\nBuilt with ❤️ for dog trainers.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <View style={styles.profileIconContainer}>
            <IconSymbol 
              ios_icon_name="person.circle.fill" 
              android_material_icon_name="account-circle" 
              size={80} 
              color={colors.primary} 
            />
          </View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <IconSymbol 
              ios_icon_name="pencil.circle.fill" 
              android_material_icon_name="edit" 
              size={20} 
              color={colors.primary} 
            />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol 
              ios_icon_name="pawprint.fill" 
              android_material_icon_name="pets" 
              size={24} 
              color={colors.primary} 
            />
            <Text style={styles.sectionTitle}>My Dogs</Text>
          </View>

          {profile.dogs.map((dog, index) => (
            <React.Fragment key={index}>
              <View style={styles.dogCard}>
                <View style={styles.dogHeader}>
                  <View style={styles.dogIconCircle}>
                    <IconSymbol 
                      ios_icon_name="pawprint.fill" 
                      android_material_icon_name="pets" 
                      size={28} 
                      color={colors.primary} 
                    />
                  </View>
                  <View style={styles.dogInfo}>
                    <Text style={styles.dogName}>{dog.name}</Text>
                    <Text style={styles.dogDetails}>{dog.breed} • {dog.age}</Text>
                  </View>
                </View>
                <View style={styles.goalsContainer}>
                  <Text style={styles.goalsLabel}>Training Goals:</Text>
                  <View style={styles.goalsTags}>
                    {dog.trainingGoals.map((goal, idx) => (
                      <React.Fragment key={idx}>
                        <View style={styles.goalTag}>
                          <Text style={styles.goalText}>{goal}</Text>
                        </View>
                      </React.Fragment>
                    ))}
                  </View>
                </View>
              </View>
            </React.Fragment>
          ))}

          <TouchableOpacity style={styles.addDogButton} onPress={handleAddDog}>
            <IconSymbol 
              ios_icon_name="plus.circle.fill" 
              android_material_icon_name="add-circle" 
              size={24} 
              color={colors.primary} 
            />
            <Text style={styles.addDogText}>Add Another Dog</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol 
              ios_icon_name="chart.bar.fill" 
              android_material_icon_name="bar-chart" 
              size={24} 
              color={colors.accent} 
            />
            <Text style={styles.sectionTitle}>Training Stats</Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <IconSymbol 
                ios_icon_name="calendar" 
                android_material_icon_name="event" 
                size={32} 
                color={colors.primary} 
              />
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Total Sessions</Text>
            </View>
            <View style={styles.statCard}>
              <IconSymbol 
                ios_icon_name="clock.fill" 
                android_material_icon_name="schedule" 
                size={32} 
                color={colors.secondary} 
              />
              <Text style={styles.statNumber}>12h</Text>
              <Text style={styles.statLabel}>Training Time</Text>
            </View>
            <View style={styles.statCard}>
              <IconSymbol 
                ios_icon_name="star.fill" 
                android_material_icon_name="star" 
                size={32} 
                color={colors.accent} 
              />
              <Text style={styles.statNumber}>18</Text>
              <Text style={styles.statLabel}>High Success</Text>
            </View>
            <View style={styles.statCard}>
              <IconSymbol 
                ios_icon_name="flame.fill" 
                android_material_icon_name="local-fire-department" 
                size={32} 
                color={colors.highlight} 
              />
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol 
              ios_icon_name="gear" 
              android_material_icon_name="settings" 
              size={24} 
              color={colors.secondary} 
            />
            <Text style={styles.sectionTitle}>Preferences</Text>
          </View>

          <View style={styles.preferenceCard}>
            <View style={styles.preferenceRow}>
              <View style={styles.preferenceLeft}>
                <IconSymbol 
                  ios_icon_name="bell.fill" 
                  android_material_icon_name="notifications" 
                  size={20} 
                  color={colors.primary} 
                />
                <View style={styles.preferenceText}>
                  <Text style={styles.preferenceTitle}>Push Notifications</Text>
                  <Text style={styles.preferenceSubtitle}>Get notified about training tips</Text>
                </View>
              </View>
              <Switch
                value={profile.preferences.notifications}
                onValueChange={(value) => updatePreference('notifications', value)}
                trackColor={{ false: colors.textSecondary + '40', true: colors.primary + '60' }}
                thumbColor={profile.preferences.notifications ? colors.primary : colors.card}
              />
            </View>

            <View style={styles.preferenceRow}>
              <View style={styles.preferenceLeft}>
                <IconSymbol 
                  ios_icon_name="envelope.fill" 
                  android_material_icon_name="email" 
                  size={20} 
                  color={colors.secondary} 
                />
                <View style={styles.preferenceText}>
                  <Text style={styles.preferenceTitle}>Email Updates</Text>
                  <Text style={styles.preferenceSubtitle}>Receive weekly training insights</Text>
                </View>
              </View>
              <Switch
                value={profile.preferences.emailUpdates}
                onValueChange={(value) => updatePreference('emailUpdates', value)}
                trackColor={{ false: colors.textSecondary + '40', true: colors.primary + '60' }}
                thumbColor={profile.preferences.emailUpdates ? colors.primary : colors.card}
              />
            </View>

            <View style={styles.preferenceRow}>
              <View style={styles.preferenceLeft}>
                <IconSymbol 
                  ios_icon_name="alarm.fill" 
                  android_material_icon_name="alarm" 
                  size={20} 
                  color={colors.accent} 
                />
                <View style={styles.preferenceText}>
                  <Text style={styles.preferenceTitle}>Training Reminders</Text>
                  <Text style={styles.preferenceSubtitle}>Daily reminders to train</Text>
                </View>
              </View>
              <Switch
                value={profile.preferences.trainingReminders}
                onValueChange={(value) => updatePreference('trainingReminders', value)}
                trackColor={{ false: colors.textSecondary + '40', true: colors.primary + '60' }}
                thumbColor={profile.preferences.trainingReminders ? colors.primary : colors.card}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol 
              ios_icon_name="ellipsis.circle.fill" 
              android_material_icon_name="more-horiz" 
              size={24} 
              color={colors.highlight} 
            />
            <Text style={styles.sectionTitle}>More</Text>
          </View>

          <TouchableOpacity style={styles.menuItem} onPress={handleExportData}>
            <IconSymbol 
              ios_icon_name="square.and.arrow.up.fill" 
              android_material_icon_name="file-upload" 
              size={20} 
              color={colors.primary} 
            />
            <Text style={styles.menuItemText}>Export Training Data</Text>
            <IconSymbol 
              ios_icon_name="chevron.right" 
              android_material_icon_name="chevron-right" 
              size={20} 
              color={colors.textSecondary} 
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleAbout}>
            <IconSymbol 
              ios_icon_name="info.circle.fill" 
              android_material_icon_name="info" 
              size={20} 
              color={colors.secondary} 
            />
            <Text style={styles.menuItemText}>About Dog Trainer AI</Text>
            <IconSymbol 
              ios_icon_name="chevron.right" 
              android_material_icon_name="chevron-right" 
              size={20} 
              color={colors.textSecondary} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => {
              Linking.openURL('https://github.com').catch(err => console.log('Error:', err));
            }}
          >
            <IconSymbol 
              ios_icon_name="questionmark.circle.fill" 
              android_material_icon_name="help" 
              size={20} 
              color={colors.accent} 
            />
            <Text style={styles.menuItemText}>Help & Support</Text>
            <IconSymbol 
              ios_icon_name="chevron.right" 
              android_material_icon_name="chevron-right" 
              size={20} 
              color={colors.textSecondary} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => {
              Linking.openURL('https://github.com').catch(err => console.log('Error:', err));
            }}
          >
            <IconSymbol 
              ios_icon_name="doc.text.fill" 
              android_material_icon_name="description" 
              size={20} 
              color={colors.highlight} 
            />
            <Text style={styles.menuItemText}>Privacy Policy</Text>
            <IconSymbol 
              ios_icon_name="chevron.right" 
              android_material_icon_name="chevron-right" 
              size={20} 
              color={colors.textSecondary} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Dog Trainer AI 2.0</Text>
          <Text style={styles.versionSubtext}>Enhanced Edition • Version 2.0.0</Text>
        </View>
      </ScrollView>
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
  contentContainer: {
    paddingTop: Platform.OS === 'android' ? 48 : 20,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileIconContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
    borderWidth: 2,
    borderColor: colors.primary + '40',
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  dogCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.textSecondary + '40',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  dogHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dogIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dogInfo: {
    marginLeft: 12,
    flex: 1,
  },
  dogName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  dogDetails: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  goalsContainer: {
    marginTop: 8,
  },
  goalsLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  goalsTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  goalTag: {
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary + '40',
  },
  goalText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  addDogButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    gap: 10,
  },
  addDogText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.textSecondary + '40',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  preferenceCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.textSecondary + '40',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.textSecondary + '20',
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  preferenceText: {
    flex: 1,
  },
  preferenceTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  preferenceSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
    gap: 12,
  },
  menuItemText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  versionSubtext: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
