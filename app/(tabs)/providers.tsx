
import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Platform,
  Linking,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";

interface ServiceProvider {
  id: string;
  name: string;
  serviceType: string;
  description: string;
  location: string;
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  certifications: string[];
  availability: string;
}

const mockProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'Pawsitive Training Academy',
    serviceType: 'Dog Training',
    description: 'Professional dog training services specializing in positive reinforcement methods. We offer puppy training, obedience classes, and behavioral modification.',
    location: 'Downtown Area, 2.3 miles away',
    phone: '(555) 123-4567',
    email: 'info@pawsitivetraining.com',
    rating: 4.8,
    reviewCount: 127,
    priceRange: '$$',
    certifications: ['CPDT-KA', 'AKC CGC Evaluator'],
    availability: 'Mon-Sat, 9AM-6PM'
  },
  {
    id: '2',
    name: 'Happy Tails Grooming',
    serviceType: 'Grooming',
    description: 'Full-service dog grooming salon with experienced groomers. We provide baths, haircuts, nail trimming, and spa treatments for all breeds.',
    location: 'Westside, 1.8 miles away',
    phone: '(555) 234-5678',
    email: 'contact@happytailsgrooming.com',
    rating: 4.9,
    reviewCount: 203,
    priceRange: '$$$',
    certifications: ['Certified Master Groomer', 'Pet First Aid'],
    availability: 'Tue-Sun, 8AM-5PM'
  },
  {
    id: '3',
    name: 'Walkies & Waggles',
    serviceType: 'Dog Walking',
    description: 'Reliable dog walking and pet sitting services. Insured and bonded walkers who love dogs and provide daily exercise and companionship.',
    location: 'Central Park Area, 3.1 miles away',
    phone: '(555) 345-6789',
    email: 'hello@walkieswaggles.com',
    rating: 4.7,
    reviewCount: 89,
    priceRange: '$',
    certifications: ['Pet Sitter Insurance', 'Background Checked'],
    availability: '7 days a week, flexible hours'
  },
  {
    id: '4',
    name: 'Canine Behavior Solutions',
    serviceType: 'Behavioral Specialist',
    description: 'Expert behavioral consultation for dogs with anxiety, aggression, or other behavioral issues. One-on-one sessions tailored to your dog&apos;s needs.',
    location: 'North District, 4.5 miles away',
    phone: '(555) 456-7890',
    email: 'consult@caninebehavior.com',
    rating: 5.0,
    reviewCount: 64,
    priceRange: '$$$',
    certifications: ['CAAB', 'IAABC Member', 'PhD Animal Behavior'],
    availability: 'By appointment only'
  },
  {
    id: '5',
    name: 'Puppy Playhouse Daycare',
    serviceType: 'Daycare & Boarding',
    description: 'Safe and fun daycare and boarding facility with supervised play groups, climate-controlled spaces, and webcam access for owners.',
    location: 'East Side, 2.7 miles away',
    phone: '(555) 567-8901',
    email: 'info@puppyplayhouse.com',
    rating: 4.6,
    reviewCount: 156,
    priceRange: '$$',
    certifications: ['Licensed Facility', 'Pet CPR Certified Staff'],
    availability: 'Mon-Fri 7AM-7PM, Sat-Sun 8AM-6PM'
  }
];

export default function ProvidersScreen() {
  const [providers, setProviders] = useState<ServiceProvider[]>(mockProviders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const serviceTypes = ['All', 'Dog Training', 'Grooming', 'Dog Walking', 'Behavioral Specialist', 'Daycare & Boarding'];

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.serviceType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || provider.serviceType === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleCall = (phone: string, providerName: string) => {
    console.log('Calling provider:', providerName);
    const phoneNumber = phone.replace(/[^0-9]/g, '');
    Linking.openURL(`tel:${phoneNumber}`).catch(err => {
      console.log('Error opening phone:', err);
      Alert.alert('Error', 'Unable to make phone call');
    });
  };

  const handleEmail = (email: string, providerName: string) => {
    console.log('Emailing provider:', providerName);
    Linking.openURL(`mailto:${email}`).catch(err => {
      console.log('Error opening email:', err);
      Alert.alert('Error', 'Unable to open email client');
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <IconSymbol 
          key={i}
          ios_icon_name={i <= rating ? "star.fill" : "star"}
          android_material_icon_name={i <= rating ? "star" : "star-border"}
          size={16}
          color={i <= rating ? colors.accent : colors.textSecondary}
        />
      );
    }
    return stars;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Service Providers</Text>
            <Text style={styles.subtitle}>Find local dog service experts</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <IconSymbol 
              ios_icon_name="magnifyingglass" 
              android_material_icon_name="search" 
              size={20} 
              color={colors.textSecondary} 
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search providers..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <IconSymbol 
                  ios_icon_name="xmark.circle.fill" 
                  android_material_icon_name="cancel" 
                  size={20} 
                  color={colors.textSecondary} 
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {serviceTypes.map((type, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedFilter === type && styles.filterButtonActive
                ]}
                onPress={() => {
                  console.log('Filter selected:', type);
                  setSelectedFilter(type);
                }}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedFilter === type && styles.filterButtonTextActive
                ]}>
                  {type}
                </Text>
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </ScrollView>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          {filteredProviders.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol 
                ios_icon_name="magnifyingglass" 
                android_material_icon_name="search-off" 
                size={64} 
                color={colors.textSecondary} 
              />
              <Text style={styles.emptyText}>No providers found</Text>
              <Text style={styles.emptySubtext}>
                Try adjusting your search or filters
              </Text>
            </View>
          ) : (
            filteredProviders.map((provider, index) => (
              <React.Fragment key={index}>
                <View style={styles.providerCard}>
                  <View style={styles.providerHeader}>
                    <View style={styles.providerHeaderLeft}>
                      <View style={styles.iconContainer}>
                        <IconSymbol 
                          ios_icon_name="building.2.fill" 
                          android_material_icon_name="business" 
                          size={32} 
                          color={colors.primary} 
                        />
                      </View>
                      <View style={styles.providerHeaderText}>
                        <Text style={styles.providerName}>{provider.name}</Text>
                        <View style={styles.ratingRow}>
                          <View style={styles.stars}>
                            {renderStars(Math.floor(provider.rating))}
                          </View>
                          <Text style={styles.ratingText}>
                            {provider.rating} ({provider.reviewCount})
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.serviceTypeBadge}>
                    <IconSymbol 
                      ios_icon_name="tag.fill" 
                      android_material_icon_name="label" 
                      size={14} 
                      color={colors.primary} 
                    />
                    <Text style={styles.serviceTypeText}>{provider.serviceType}</Text>
                    <Text style={styles.priceRangeText}>{provider.priceRange}</Text>
                  </View>

                  <Text style={styles.description}>{provider.description}</Text>

                  <View style={styles.infoRow}>
                    <IconSymbol 
                      ios_icon_name="location.fill" 
                      android_material_icon_name="location-on" 
                      size={16} 
                      color={colors.textSecondary} 
                    />
                    <Text style={styles.infoText}>{provider.location}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <IconSymbol 
                      ios_icon_name="clock.fill" 
                      android_material_icon_name="schedule" 
                      size={16} 
                      color={colors.textSecondary} 
                    />
                    <Text style={styles.infoText}>{provider.availability}</Text>
                  </View>

                  {provider.certifications.length > 0 && (
                    <View style={styles.certificationsContainer}>
                      <IconSymbol 
                        ios_icon_name="checkmark.seal.fill" 
                        android_material_icon_name="verified" 
                        size={16} 
                        color={colors.highlight} 
                      />
                      <Text style={styles.certificationsText}>
                        {provider.certifications.join(' • ')}
                      </Text>
                    </View>
                  )}

                  <View style={styles.contactButtons}>
                    <TouchableOpacity 
                      style={styles.contactButton}
                      onPress={() => handleCall(provider.phone, provider.name)}
                    >
                      <IconSymbol 
                        ios_icon_name="phone.fill" 
                        android_material_icon_name="phone" 
                        size={20} 
                        color={colors.card} 
                      />
                      <Text style={styles.contactButtonText}>Call</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={[styles.contactButton, styles.emailButton]}
                      onPress={() => handleEmail(provider.email, provider.name)}
                    >
                      <IconSymbol 
                        ios_icon_name="envelope.fill" 
                        android_material_icon_name="email" 
                        size={20} 
                        color={colors.card} 
                      />
                      <Text style={styles.contactButtonText}>Email</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </React.Fragment>
            ))
          )}

          <View style={styles.infoCard}>
            <IconSymbol 
              ios_icon_name="info.circle.fill" 
              android_material_icon_name="info" 
              size={24} 
              color={colors.primary} 
            />
            <Text style={styles.infoCardText}>
              Want to add your service? Contact us to get listed and connect with local dog owners.
            </Text>
          </View>
        </ScrollView>
      </View>
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
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
  providerCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  providerHeader: {
    marginBottom: 12,
  },
  providerHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerHeaderText: {
    marginLeft: 12,
    flex: 1,
  },
  providerName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: 6,
  },
  ratingText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  serviceTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  serviceTypeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 6,
  },
  priceRangeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
    flex: 1,
  },
  certificationsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.highlight + '20',
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  certificationsText: {
    fontSize: 12,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    boxShadow: '0px 2px 8px rgba(100, 149, 237, 0.3)',
    elevation: 3,
  },
  emailButton: {
    backgroundColor: colors.secondary,
  },
  contactButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.card,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.primary + '40',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  infoCardText: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 12,
    lineHeight: 18,
  },
});
