
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
  Alert,
  Modal
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ServiceProvider {
  id: string;
  name: string;
  serviceType: string;
  description: string;
  location: string;
  distance: number;
  phone: string;
  email: string;
  website?: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  certifications: string[];
  availability: string;
  specialties: string[];
  yearsExperience: number;
  reviews: Review[];
}

const mockProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'Pawsitive Training Academy',
    serviceType: 'Dog Training',
    description: 'Professional dog training services specializing in positive reinforcement methods. We offer puppy training, obedience classes, and behavioral modification with certified trainers.',
    location: 'Downtown Area',
    distance: 2.3,
    phone: '(555) 123-4567',
    email: 'info@pawsitivetraining.com',
    website: 'www.pawsitivetraining.com',
    rating: 4.8,
    reviewCount: 127,
    priceRange: '$$',
    certifications: ['CPDT-KA', 'AKC CGC Evaluator', 'Fear Free Certified'],
    availability: 'Mon-Sat, 9AM-6PM',
    specialties: ['Puppy Training', 'Obedience', 'Behavioral Issues', 'Scent Work'],
    yearsExperience: 12,
    reviews: [
      {
        id: '1',
        userName: 'Sarah M.',
        rating: 5,
        comment: 'Amazing trainer! Helped our reactive dog become much calmer on walks.',
        date: '2024-01-10'
      },
      {
        id: '2',
        userName: 'John D.',
        rating: 5,
        comment: 'Very knowledgeable and patient. Highly recommend for puppy training!',
        date: '2024-01-05'
      }
    ]
  },
  {
    id: '2',
    name: 'Happy Tails Grooming',
    serviceType: 'Grooming',
    description: 'Full-service dog grooming salon with experienced groomers. We provide baths, haircuts, nail trimming, and spa treatments for all breeds with gentle, fear-free techniques.',
    location: 'Westside',
    distance: 1.8,
    phone: '(555) 234-5678',
    email: 'contact@happytailsgrooming.com',
    rating: 4.9,
    reviewCount: 203,
    priceRange: '$$$',
    certifications: ['Certified Master Groomer', 'Pet First Aid', 'Fear Free Grooming'],
    availability: 'Tue-Sun, 8AM-5PM',
    specialties: ['All Breeds', 'Show Cuts', 'Senior Dogs', 'Anxious Dogs'],
    yearsExperience: 15,
    reviews: [
      {
        id: '1',
        userName: 'Emily R.',
        rating: 5,
        comment: 'Best groomer in town! My poodle always looks amazing.',
        date: '2024-01-12'
      }
    ]
  },
  {
    id: '3',
    name: 'Walkies & Waggles',
    serviceType: 'Dog Walking',
    description: 'Reliable dog walking and pet sitting services. Insured and bonded walkers who love dogs and provide daily exercise and companionship with GPS tracking.',
    location: 'Central Park Area',
    distance: 3.1,
    phone: '(555) 345-6789',
    email: 'hello@walkieswaggles.com',
    rating: 4.7,
    reviewCount: 89,
    priceRange: '$',
    certifications: ['Pet Sitter Insurance', 'Background Checked', 'Pet First Aid'],
    availability: '7 days a week, flexible hours',
    specialties: ['Group Walks', 'Solo Walks', 'Pet Sitting', 'Puppy Visits'],
    yearsExperience: 5,
    reviews: []
  },
  {
    id: '4',
    name: 'Canine Behavior Solutions',
    serviceType: 'Behavioral Specialist',
    description: 'Expert behavioral consultation for dogs with anxiety, aggression, or other behavioral issues. One-on-one sessions tailored to your dog&apos;s specific needs with science-based methods.',
    location: 'North District',
    distance: 4.5,
    phone: '(555) 456-7890',
    email: 'consult@caninebehavior.com',
    rating: 5.0,
    reviewCount: 64,
    priceRange: '$$$',
    certifications: ['CAAB', 'IAABC Member', 'PhD Animal Behavior', 'Veterinary Behaviorist'],
    availability: 'By appointment only',
    specialties: ['Aggression', 'Anxiety', 'Fear', 'Separation Issues'],
    yearsExperience: 20,
    reviews: [
      {
        id: '1',
        userName: 'Michael T.',
        rating: 5,
        comment: 'Life-changing! Our aggressive dog is now manageable thanks to Dr. Smith.',
        date: '2024-01-08'
      }
    ]
  },
  {
    id: '5',
    name: 'Puppy Playhouse Daycare',
    serviceType: 'Daycare & Boarding',
    description: 'Safe and fun daycare and boarding facility with supervised play groups, climate-controlled spaces, and webcam access for owners. Individual attention for every pup.',
    location: 'East Side',
    distance: 2.7,
    phone: '(555) 567-8901',
    email: 'info@puppyplayhouse.com',
    rating: 4.6,
    reviewCount: 156,
    priceRange: '$$',
    certifications: ['Licensed Facility', 'Pet CPR Certified Staff', 'Insured'],
    availability: 'Mon-Fri 7AM-7PM, Sat-Sun 8AM-6PM',
    specialties: ['Daycare', 'Boarding', 'Puppy Socialization', 'Senior Care'],
    yearsExperience: 8,
    reviews: []
  }
];

export default function ProvidersScreen() {
  const [providers] = useState<ServiceProvider[]>(mockProviders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance');
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const serviceTypes = ['All', 'Dog Training', 'Grooming', 'Dog Walking', 'Behavioral Specialist', 'Daycare & Boarding'];

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = selectedFilter === 'All' || provider.serviceType === selectedFilter;
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    if (sortBy === 'distance') {
      return a.distance - b.distance;
    } else {
      return b.rating - a.rating;
    }
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

  const handleWebsite = (website: string, providerName: string) => {
    console.log('Opening website for:', providerName);
    const url = website.startsWith('http') ? website : `https://${website}`;
    Linking.openURL(url).catch(err => {
      console.log('Error opening website:', err);
      Alert.alert('Error', 'Unable to open website');
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <IconSymbol 
            key={i}
            ios_icon_name="star.fill"
            android_material_icon_name="star"
            size={16}
            color={colors.accent}
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <IconSymbol 
            key={i}
            ios_icon_name="star.leadinghalf.filled"
            android_material_icon_name="star-half"
            size={16}
            color={colors.accent}
          />
        );
      } else {
        stars.push(
          <IconSymbol 
            key={i}
            ios_icon_name="star"
            android_material_icon_name="star-border"
            size={16}
            color={colors.textSecondary}
          />
        );
      }
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
              placeholder="Search providers or specialties..."
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

        <View style={styles.controlsRow}>
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

          <View style={styles.sortButtons}>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'distance' && styles.sortButtonActive]}
              onPress={() => setSortBy('distance')}
            >
              <IconSymbol 
                ios_icon_name="location.fill" 
                android_material_icon_name="near-me" 
                size={16} 
                color={sortBy === 'distance' ? colors.card : colors.primary} 
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'rating' && styles.sortButtonActive]}
              onPress={() => setSortBy('rating')}
            >
              <IconSymbol 
                ios_icon_name="star.fill" 
                android_material_icon_name="star" 
                size={16} 
                color={sortBy === 'rating' ? colors.card : colors.primary} 
              />
            </TouchableOpacity>
          </View>
        </View>

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
                <TouchableOpacity 
                  style={styles.providerCard}
                  onPress={() => {
                    setSelectedProvider(provider);
                    setShowDetailModal(true);
                  }}
                >
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
                            {renderStars(provider.rating)}
                          </View>
                          <Text style={styles.ratingText}>
                            {provider.rating} ({provider.reviewCount})
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.badgeRow}>
                    <View style={styles.serviceTypeBadge}>
                      <IconSymbol 
                        ios_icon_name="tag.fill" 
                        android_material_icon_name="label" 
                        size={14} 
                        color={colors.primary} 
                      />
                      <Text style={styles.serviceTypeText}>{provider.serviceType}</Text>
                    </View>
                    <Text style={styles.priceRangeText}>{provider.priceRange}</Text>
                    <View style={styles.distanceBadge}>
                      <IconSymbol 
                        ios_icon_name="location.fill" 
                        android_material_icon_name="location-on" 
                        size={14} 
                        color={colors.secondary} 
                      />
                      <Text style={styles.distanceText}>{provider.distance} mi</Text>
                    </View>
                  </View>

                  <Text style={styles.description} numberOfLines={2}>{provider.description}</Text>

                  <View style={styles.specialtiesRow}>
                    {provider.specialties.slice(0, 3).map((specialty, idx) => (
                      <React.Fragment key={idx}>
                        <View style={styles.specialtyTag}>
                          <Text style={styles.specialtyText}>{specialty}</Text>
                        </View>
                      </React.Fragment>
                    ))}
                    {provider.specialties.length > 3 && (
                      <Text style={styles.moreSpecialties}>+{provider.specialties.length - 3}</Text>
                    )}
                  </View>

                  <View style={styles.quickInfo}>
                    <View style={styles.quickInfoItem}>
                      <IconSymbol 
                        ios_icon_name="checkmark.seal.fill" 
                        android_material_icon_name="verified" 
                        size={16} 
                        color={colors.highlight} 
                      />
                      <Text style={styles.quickInfoText}>{provider.certifications.length} certs</Text>
                    </View>
                    <View style={styles.quickInfoItem}>
                      <IconSymbol 
                        ios_icon_name="calendar" 
                        android_material_icon_name="event" 
                        size={16} 
                        color={colors.primary} 
                      />
                      <Text style={styles.quickInfoText}>{provider.yearsExperience} years exp</Text>
                    </View>
                  </View>

                  <View style={styles.contactButtons}>
                    <TouchableOpacity 
                      style={styles.contactButton}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleCall(provider.phone, provider.name);
                      }}
                    >
                      <IconSymbol 
                        ios_icon_name="phone.fill" 
                        android_material_icon_name="phone" 
                        size={18} 
                        color={colors.card} 
                      />
                      <Text style={styles.contactButtonText}>Call</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={[styles.contactButton, styles.emailButton]}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleEmail(provider.email, provider.name);
                      }}
                    >
                      <IconSymbol 
                        ios_icon_name="envelope.fill" 
                        android_material_icon_name="email" 
                        size={18} 
                        color={colors.card} 
                      />
                      <Text style={styles.contactButtonText}>Email</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={[styles.contactButton, styles.detailsButton]}
                      onPress={() => {
                        setSelectedProvider(provider);
                        setShowDetailModal(true);
                      }}
                    >
                      <Text style={styles.detailsButtonText}>Details</Text>
                      <IconSymbol 
                        ios_icon_name="chevron.right" 
                        android_material_icon_name="chevron-right" 
                        size={18} 
                        color={colors.primary} 
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
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
              Want to add your service? Contact us to get listed and connect with local dog owners looking for professional help.
            </Text>
          </View>
        </ScrollView>
      </View>

      {/* Provider Detail Modal */}
      <Modal
        visible={showDetailModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDetailModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedProvider && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedProvider.name}</Text>
                  <TouchableOpacity onPress={() => setShowDetailModal(false)}>
                    <IconSymbol 
                      ios_icon_name="xmark.circle.fill" 
                      android_material_icon_name="cancel" 
                      size={28} 
                      color={colors.text} 
                    />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalScroll}>
                  <View style={styles.modalSection}>
                    <View style={styles.ratingRow}>
                      <View style={styles.stars}>
                        {renderStars(selectedProvider.rating)}
                      </View>
                      <Text style={styles.ratingText}>
                        {selectedProvider.rating} ({selectedProvider.reviewCount} reviews)
                      </Text>
                    </View>
                    <Text style={styles.modalServiceType}>{selectedProvider.serviceType} • {selectedProvider.priceRange}</Text>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.sectionTitle}>About</Text>
                    <Text style={styles.sectionText}>{selectedProvider.description}</Text>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.sectionTitle}>Specialties</Text>
                    <View style={styles.specialtiesGrid}>
                      {selectedProvider.specialties.map((specialty, idx) => (
                        <React.Fragment key={idx}>
                          <View style={styles.specialtyTag}>
                            <Text style={styles.specialtyText}>{specialty}</Text>
                          </View>
                        </React.Fragment>
                      ))}
                    </View>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.sectionTitle}>Certifications</Text>
                    {selectedProvider.certifications.map((cert, idx) => (
                      <React.Fragment key={idx}>
                        <View style={styles.certItem}>
                          <IconSymbol 
                            ios_icon_name="checkmark.seal.fill" 
                            android_material_icon_name="verified" 
                            size={20} 
                            color={colors.highlight} 
                          />
                          <Text style={styles.certText}>{cert}</Text>
                        </View>
                      </React.Fragment>
                    ))}
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.sectionTitle}>Contact Information</Text>
                    <View style={styles.contactInfo}>
                      <View style={styles.contactInfoRow}>
                        <IconSymbol 
                          ios_icon_name="phone.fill" 
                          android_material_icon_name="phone" 
                          size={20} 
                          color={colors.primary} 
                        />
                        <Text style={styles.contactInfoText}>{selectedProvider.phone}</Text>
                      </View>
                      <View style={styles.contactInfoRow}>
                        <IconSymbol 
                          ios_icon_name="envelope.fill" 
                          android_material_icon_name="email" 
                          size={20} 
                          color={colors.primary} 
                        />
                        <Text style={styles.contactInfoText}>{selectedProvider.email}</Text>
                      </View>
                      {selectedProvider.website && (
                        <TouchableOpacity 
                          style={styles.contactInfoRow}
                          onPress={() => handleWebsite(selectedProvider.website!, selectedProvider.name)}
                        >
                          <IconSymbol 
                            ios_icon_name="globe" 
                            android_material_icon_name="language" 
                            size={20} 
                            color={colors.primary} 
                          />
                          <Text style={[styles.contactInfoText, styles.linkText]}>{selectedProvider.website}</Text>
                        </TouchableOpacity>
                      )}
                      <View style={styles.contactInfoRow}>
                        <IconSymbol 
                          ios_icon_name="location.fill" 
                          android_material_icon_name="location-on" 
                          size={20} 
                          color={colors.primary} 
                        />
                        <Text style={styles.contactInfoText}>{selectedProvider.location} ({selectedProvider.distance} miles away)</Text>
                      </View>
                      <View style={styles.contactInfoRow}>
                        <IconSymbol 
                          ios_icon_name="clock.fill" 
                          android_material_icon_name="schedule" 
                          size={20} 
                          color={colors.primary} 
                        />
                        <Text style={styles.contactInfoText}>{selectedProvider.availability}</Text>
                      </View>
                    </View>
                  </View>

                  {selectedProvider.reviews.length > 0 && (
                    <View style={styles.modalSection}>
                      <Text style={styles.sectionTitle}>Recent Reviews</Text>
                      {selectedProvider.reviews.map((review, idx) => (
                        <React.Fragment key={idx}>
                          <View style={styles.reviewCard}>
                            <View style={styles.reviewHeader}>
                              <Text style={styles.reviewUser}>{review.userName}</Text>
                              <View style={styles.reviewStars}>
                                {renderStars(review.rating)}
                              </View>
                            </View>
                            <Text style={styles.reviewComment}>{review.comment}</Text>
                            <Text style={styles.reviewDate}>{review.date}</Text>
                          </View>
                        </React.Fragment>
                      ))}
                    </View>
                  )}

                  <View style={styles.modalActions}>
                    <TouchableOpacity 
                      style={styles.modalActionButton}
                      onPress={() => handleCall(selectedProvider.phone, selectedProvider.name)}
                    >
                      <IconSymbol 
                        ios_icon_name="phone.fill" 
                        android_material_icon_name="phone" 
                        size={20} 
                        color={colors.card} 
                      />
                      <Text style={styles.modalActionText}>Call Now</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={[styles.modalActionButton, styles.modalActionButtonSecondary]}
                      onPress={() => handleEmail(selectedProvider.email, selectedProvider.name)}
                    >
                      <IconSymbol 
                        ios_icon_name="envelope.fill" 
                        android_material_icon_name="email" 
                        size={20} 
                        color={colors.card} 
                      />
                      <Text style={styles.modalActionText}>Send Email</Text>
                    </TouchableOpacity>
                  </View>
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 2,
    borderColor: colors.primary + '40',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 20,
  },
  filterContainer: {
    flex: 1,
    maxHeight: 50,
  },
  filterContent: {
    gap: 8,
    paddingRight: 12,
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
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 20,
  },
  sortButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
  },
  sortButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
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
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.textSecondary + '40',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
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
    fontWeight: '700',
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
    fontWeight: '600',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  serviceTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  serviceTypeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  priceRangeText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accent,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary + '20',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  distanceText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.secondary,
  },
  description: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  specialtiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  specialtyTag: {
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
  },
  specialtyText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  moreSpecialties: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    alignSelf: 'center',
  },
  quickInfo: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  quickInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  quickInfoText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
    boxShadow: '0px 2px 8px rgba(100, 149, 237, 0.3)',
    elevation: 3,
  },
  emailButton: {
    backgroundColor: colors.secondary,
  },
  detailsButton: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.card,
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.primary + '40',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    gap: 12,
  },
  infoCardText: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
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
    flex: 1,
  },
  modalScroll: {
    padding: 20,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalServiceType: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  specialtiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  certItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  certText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  contactInfo: {
    gap: 12,
  },
  contactInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactInfoText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  linkText: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  reviewCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 6,
  },
  reviewDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 40,
  },
  modalActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    boxShadow: '0px 4px 12px rgba(100, 149, 237, 0.4)',
    elevation: 5,
  },
  modalActionButtonSecondary: {
    backgroundColor: colors.secondary,
  },
  modalActionText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.card,
  },
});
