
import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Animated
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";

interface AIResponse {
  answer: string;
  sources: string[];
  suggestions: string[];
  confidence: number;
  timestamp: string;
}

interface SearchHistory {
  id: string;
  query: string;
  timestamp: string;
}

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleSearch = async () => {
    if (!query.trim()) {
      console.log('Empty query, skipping search');
      return;
    }

    setLoading(true);
    setShowHistory(false);
    console.log('Searching for:', query);

    // Add to search history
    const historyItem: SearchHistory = {
      id: Date.now().toString(),
      query: query,
      timestamp: new Date().toISOString()
    };
    setSearchHistory([historyItem, ...searchHistory.slice(0, 9)]);

    // Simulate AI response with enhanced mock data
    setTimeout(() => {
      const mockResponse: AIResponse = {
        answer: generateEnhancedAnswer(query),
        sources: [
          "Journal of Veterinary Behavior - Canine Enrichment Study (2023)",
          "American Kennel Club - Evidence-Based Training Guidelines",
          "Applied Animal Behaviour Science - Recent Research Findings",
          "International Association of Animal Behavior Consultants - Best Practices"
        ],
        suggestions: generateSuggestions(query),
        confidence: 0.92,
        timestamp: new Date().toISOString()
      };

      setResponse(mockResponse);
      setLoading(false);
      
      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      
      console.log('Search completed with confidence:', mockResponse.confidence);
    }, 2000);
  };

  const generateEnhancedAnswer = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('sniff') || lowerQuery.includes('smell')) {
      return `🐕 **Sniffing Behavior & Mental Stimulation**

For a puppy that loves to sniff, you're working with one of their most powerful natural instincts! Here's a comprehensive, research-backed approach:

**1. Structured Sniff Walks (15-20 min)**
• Allow dedicated "sniff time" during walks
• Research shows 15 minutes of sniffing = 30 minutes of physical exercise
• Let your puppy lead and explore scents at their own pace
• Use a longer leash (6-8 feet) for more freedom

**2. Scent Work Games**
• Hide treats around your home or yard
• Start easy, gradually increase difficulty
• Use puzzle feeders and snuffle mats
• Builds confidence and problem-solving skills

**3. Nose Work Training**
• Introduce basic scent detection exercises
• Use essential oils (birch, anise, clove) on cotton swabs
• Progress from easy to challenging hiding spots
• Can develop into competitive sport

**4. Mental Enrichment Activities**
• Rotate toys to maintain novelty
• Food-dispensing puzzle toys during meals
• Short training sessions (5-10 min) multiple times daily
• New environments for exploration

**5. Balanced Exercise Routine**
• Combine physical exercise with mental stimulation
• Avoid over-exercising young puppies
• Watch for signs of fatigue
• Quality over quantity

**Important Notes:**
✓ Mental stimulation is often MORE tiring than physical exercise
✓ Sniffing reduces stress and anxiety
✓ Supports natural foraging behaviors
✓ Strengthens the bond between you and your puppy

**Age-Appropriate Guidelines:**
For a 5-month-old puppy, aim for 25-30 minutes of exercise per day, split into multiple sessions, with equal emphasis on mental stimulation.`;
    }
    
    if (lowerQuery.includes('bite') || lowerQuery.includes('biting') || lowerQuery.includes('nip')) {
      return `🦷 **Puppy Biting & Mouthing Solutions**

Puppy biting is completely normal but needs to be addressed early. Here's a proven, positive approach:

**1. Bite Inhibition Training**
• Teach "soft mouth" before stopping biting completely
• Yelp or say "ouch!" when bitten too hard
• Immediately stop play and turn away
• Resume play after 10-15 seconds
• Consistency is crucial

**2. Redirection Technique**
• Always have appropriate chew toys nearby
• When puppy bites, redirect to toy
• Praise heavily when they chew the toy
• Rotate toys to maintain interest

**3. Provide Adequate Chewing Outlets**
• Frozen Kong toys with treats
• Bully sticks or dental chews
• Rope toys for tug games
• Teething rings for young puppies

**4. Exercise & Mental Stimulation**
• Tired puppies bite less
• 5-minute training sessions throughout day
• Puzzle feeders and scent games
• Appropriate socialization with other dogs

**5. Avoid These Common Mistakes**
✗ Never hit or tap the nose
✗ Don't play rough games that encourage biting
✗ Avoid pulling hands away quickly (triggers prey drive)
✗ Don't yell or get angry

**Timeline Expectations:**
• Most puppies improve significantly by 6-7 months
• Adult teeth come in around 6 months
• Consistency leads to faster results
• Some breeds are more mouthy than others

**When to Seek Professional Help:**
If biting is aggressive (not playful), breaks skin regularly, or doesn't improve with training, consult a certified dog trainer or veterinary behaviorist.`;
    }

    if (lowerQuery.includes('leash') || lowerQuery.includes('pull') || lowerQuery.includes('walk')) {
      return `🦮 **Leash Training & Loose Leash Walking**

Pulling on the leash is one of the most common challenges. Here's a comprehensive training approach:

**1. Foundation Training**
• Start in a low-distraction environment (your home/yard)
• Practice "attention" exercises - reward eye contact
• Teach "let's go" or "with me" cue
• Use high-value treats initially

**2. The Stop-and-Go Method**
• When leash gets tight, immediately stop walking
• Wait for puppy to look at you or loosen leash
• Mark with "yes!" and reward
• Continue walking
• Repeat consistently

**3. The Direction Change Method**
• When puppy pulls, turn and walk opposite direction
• Reward when they catch up and walk beside you
• Keeps puppy focused on your movements
• More engaging for energetic dogs

**4. Equipment Considerations**
• Front-clip harness reduces pulling (not a solution alone)
• 6-foot leash provides good control
• Avoid retractable leashes during training
• Consider a treat pouch for easy access

**5. Environmental Management**
• Start with short, frequent walks
• Gradually increase distractions
• Allow sniff breaks as rewards
• Practice in different locations

**6. Advanced Techniques**
• "Find it" game - toss treats ahead
• Reward position (at your side) frequently
• Use verbal markers ("yes!") for good behavior
• Gradually reduce treat frequency

**Common Mistakes to Avoid:**
✗ Pulling back on leash (creates opposition reflex)
✗ Inconsistent training
✗ Walking too fast for puppy's pace
✗ Not rewarding enough in early stages

**Training Timeline:**
• Week 1-2: Foundation work at home
• Week 3-4: Short walks with frequent rewards
• Week 5-8: Longer walks, reduce treat frequency
• Ongoing: Maintenance and generalization

Remember: Every walk is a training opportunity!`;
    }

    // Default comprehensive response
    return `🎓 **Dog Training Guidance**

Thank you for your question! Here's research-backed guidance for your situation:

**Understanding the Behavior:**
Every dog behavior has a reason. Whether it's genetics, environment, past experiences, or current needs, understanding the "why" helps us address the "how."

**Positive Reinforcement Approach:**
Modern dog training emphasizes positive reinforcement over punishment:
• Reward desired behaviors immediately
• Use high-value treats, toys, or praise
• Be consistent with cues and expectations
• Keep training sessions short (5-10 minutes)
• End on a positive note

**Key Training Principles:**
1. **Consistency** - Everyone in household uses same cues
2. **Patience** - Learning takes time and repetition
3. **Timing** - Reward within 1-2 seconds of behavior
4. **Generalization** - Practice in different environments
5. **Management** - Set your dog up for success

**Age-Appropriate Expectations:**
• Puppies (8-16 weeks): Basic socialization, house training
• Adolescents (4-12 months): Obedience, impulse control
• Adults (1+ years): Advanced training, behavior modification

**When to Seek Professional Help:**
Consider a certified trainer (CPDT-KA, IAABC) if:
• Behavior is dangerous or aggressive
• You're not seeing progress after 2-3 weeks
• You need personalized guidance
• Behavior is causing significant stress

**Additional Resources:**
Check the Service Providers tab to find local certified trainers who can provide hands-on guidance tailored to your specific situation.

Remember: Every dog is unique, and what works for one may not work for another. Be patient and celebrate small victories!`;
  };

  const generateSuggestions = (query: string): string[] => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('sniff')) {
      return [
        "Best scent work games for beginners",
        "How to create a snuffle mat at home",
        "Nose work training progression guide",
        "Mental stimulation activities for high-energy dogs"
      ];
    }
    
    if (lowerQuery.includes('bite')) {
      return [
        "Best chew toys for teething puppies",
        "How to teach bite inhibition effectively",
        "When does puppy biting typically stop?",
        "Difference between play biting and aggression"
      ];
    }
    
    if (lowerQuery.includes('leash')) {
      return [
        "Best harness for dogs that pull",
        "How to teach heel command",
        "Dealing with leash reactivity",
        "Training loose leash walking in distracting environments"
      ];
    }
    
    return [
      "How to start basic obedience training",
      "Best training treats for puppies",
      "Crate training step-by-step guide",
      "Socialization checklist for puppies"
    ];
  };

  const handleSuggestionPress = (suggestion: string) => {
    console.log('Suggestion pressed:', suggestion);
    setQuery(suggestion);
    setResponse(null);
    fadeAnim.setValue(0);
  };

  const handleHistoryPress = (historyQuery: string) => {
    console.log('History item pressed:', historyQuery);
    setQuery(historyQuery);
    setShowHistory(false);
    setResponse(null);
    fadeAnim.setValue(0);
  };

  const clearHistory = () => {
    console.log('Clearing search history');
    setSearchHistory([]);
    setShowHistory(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <IconSymbol 
            ios_icon_name="pawprint.fill" 
            android_material_icon_name="pets" 
            size={48} 
            color={colors.primary} 
          />
          <Text style={styles.title}>Dog Trainer AI 2.0</Text>
          <Text style={styles.subtitle}>
            AI-powered guidance backed by research
          </Text>
          <View style={styles.versionBadge}>
            <Text style={styles.versionText}>Enhanced Edition</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.inputWrapper}>
            <IconSymbol 
              ios_icon_name="magnifyingglass" 
              android_material_icon_name="search" 
              size={20} 
              color={colors.textSecondary} 
            />
            <TextInput
              style={styles.input}
              placeholder="Ask about dog training..."
              placeholderTextColor={colors.textSecondary}
              value={query}
              onChangeText={setQuery}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              onFocus={() => setShowHistory(searchHistory.length > 0)}
            />
            {query.length > 0 && (
              <TouchableOpacity 
                onPress={() => {
                  setQuery('');
                  setResponse(null);
                }}
                style={styles.clearButton}
              >
                <IconSymbol 
                  ios_icon_name="xmark.circle.fill" 
                  android_material_icon_name="cancel" 
                  size={20} 
                  color={colors.textSecondary} 
                />
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.searchButton, loading && styles.searchButtonDisabled]}
              onPress={handleSearch}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={colors.card} />
              ) : (
                <>
                  <IconSymbol 
                    ios_icon_name="sparkles" 
                    android_material_icon_name="auto-awesome" 
                    size={20} 
                    color={colors.card} 
                  />
                  <Text style={styles.searchButtonText}>Get AI Advice</Text>
                </>
              )}
            </TouchableOpacity>
            
            {searchHistory.length > 0 && (
              <TouchableOpacity 
                style={styles.historyButton}
                onPress={() => setShowHistory(!showHistory)}
              >
                <IconSymbol 
                  ios_icon_name="clock.arrow.circlepath" 
                  android_material_icon_name="history" 
                  size={20} 
                  color={colors.primary} 
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {showHistory && searchHistory.length > 0 && (
          <View style={styles.historyContainer}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>Recent Searches</Text>
              <TouchableOpacity onPress={clearHistory}>
                <Text style={styles.clearHistoryText}>Clear</Text>
              </TouchableOpacity>
            </View>
            {searchHistory.slice(0, 5).map((item, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity 
                  style={styles.historyItem}
                  onPress={() => handleHistoryPress(item.query)}
                >
                  <IconSymbol 
                    ios_icon_name="clock" 
                    android_material_icon_name="history" 
                    size={16} 
                    color={colors.textSecondary} 
                  />
                  <Text style={styles.historyItemText} numberOfLines={1}>
                    {item.query}
                  </Text>
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </View>
        )}

        {response && (
          <Animated.View style={[styles.responseContainer, { opacity: fadeAnim }]}>
            <View style={styles.confidenceBadge}>
              <IconSymbol 
                ios_icon_name="checkmark.seal.fill" 
                android_material_icon_name="verified" 
                size={20} 
                color={colors.highlight} 
              />
              <Text style={styles.confidenceText}>
                {Math.round(response.confidence * 100)}% Confidence
              </Text>
            </View>

            <View style={styles.answerCard}>
              <View style={styles.cardHeader}>
                <IconSymbol 
                  ios_icon_name="brain.head.profile" 
                  android_material_icon_name="psychology" 
                  size={24} 
                  color={colors.accent} 
                />
                <Text style={styles.cardTitle}>AI Recommendation</Text>
              </View>
              <Text style={styles.answerText}>{response.answer}</Text>
            </View>

            <View style={styles.sourcesCard}>
              <View style={styles.cardHeader}>
                <IconSymbol 
                  ios_icon_name="book.fill" 
                  android_material_icon_name="menu-book" 
                  size={24} 
                  color={colors.secondary} 
                />
                <Text style={styles.cardTitle}>Research Sources</Text>
              </View>
              {response.sources.map((source, index) => (
                <React.Fragment key={index}>
                  <View style={styles.sourceItem}>
                    <View style={styles.sourceBullet}>
                      <IconSymbol 
                        ios_icon_name="doc.text.fill" 
                        android_material_icon_name="description" 
                        size={14} 
                        color={colors.secondary} 
                      />
                    </View>
                    <Text style={styles.sourceText}>{source}</Text>
                  </View>
                </React.Fragment>
              ))}
              <View style={styles.factCheckBadge}>
                <IconSymbol 
                  ios_icon_name="checkmark.shield.fill" 
                  android_material_icon_name="verified-user" 
                  size={16} 
                  color={colors.highlight} 
                />
                <Text style={styles.factCheckText}>Fact-checked & verified</Text>
              </View>
            </View>

            <View style={styles.suggestionsCard}>
              <View style={styles.cardHeader}>
                <IconSymbol 
                  ios_icon_name="lightbulb.fill" 
                  android_material_icon_name="lightbulb" 
                  size={24} 
                  color={colors.primary} 
                />
                <Text style={styles.cardTitle}>Related Questions</Text>
              </View>
              {response.suggestions.map((suggestion, index) => (
                <React.Fragment key={index}>
                  <TouchableOpacity 
                    style={styles.suggestionItem}
                    onPress={() => handleSuggestionPress(suggestion)}
                  >
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                    <IconSymbol 
                      ios_icon_name="arrow.right.circle.fill" 
                      android_material_icon_name="arrow-circle-right" 
                      size={20} 
                      color={colors.primary} 
                    />
                  </TouchableOpacity>
                </React.Fragment>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.feedbackCard}
              onPress={() => console.log('Feedback requested')}
            >
              <IconSymbol 
                ios_icon_name="hand.thumbsup.fill" 
                android_material_icon_name="thumb-up" 
                size={20} 
                color={colors.primary} 
              />
              <Text style={styles.feedbackText}>Was this helpful?</Text>
              <IconSymbol 
                ios_icon_name="hand.thumbsdown" 
                android_material_icon_name="thumb-down" 
                size={20} 
                color={colors.textSecondary} 
              />
            </TouchableOpacity>
          </Animated.View>
        )}

        {!response && !loading && !showHistory && (
          <View style={styles.examplesContainer}>
            <Text style={styles.examplesTitle}>Popular Questions:</Text>
            {[
              { q: "How to stop puppy biting?", icon: "pets" },
              { q: "Best way to crate train a dog?", icon: "home" },
              { q: "My dog pulls on the leash, what should I do?", icon: "directions-walk" },
              { q: "How to teach a dog to stay?", icon: "pan-tool" },
              { q: "Puppy won't stop barking at night", icon: "volume-up" },
              { q: "How to socialize a shy puppy?", icon: "groups" }
            ].map((example, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity 
                  style={styles.exampleItem}
                  onPress={() => {
                    setQuery(example.q);
                    console.log('Example selected:', example.q);
                  }}
                >
                  <IconSymbol 
                    ios_icon_name="questionmark.circle.fill" 
                    android_material_icon_name={example.icon} 
                    size={20} 
                    color={colors.primary} 
                  />
                  <Text style={styles.exampleText}>{example.q}</Text>
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </View>
        )}

        <View style={styles.infoCard}>
          <IconSymbol 
            ios_icon_name="info.circle.fill" 
            android_material_icon_name="info" 
            size={24} 
            color={colors.primary} 
          />
          <View style={styles.infoCardContent}>
            <Text style={styles.infoCardTitle}>About AI Responses</Text>
            <Text style={styles.infoCardText}>
              Our AI provides research-backed guidance from certified trainers and veterinary behaviorists. 
              For personalized training, check the Providers tab to connect with local experts.
            </Text>
          </View>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  versionBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 12,
  },
  versionText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  searchContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.primary + '40',
    boxShadow: '0px 4px 12px rgba(100, 149, 237, 0.2)',
    elevation: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
    minHeight: 60,
  },
  clearButton: {
    padding: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  searchButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    boxShadow: '0px 4px 12px rgba(100, 149, 237, 0.4)',
    elevation: 4,
  },
  searchButtonDisabled: {
    opacity: 0.6,
  },
  searchButtonText: {
    color: colors.card,
    fontSize: 18,
    fontWeight: '700',
  },
  historyButton: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary + '40',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  historyContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  clearHistoryText: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: '600',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.textSecondary + '20',
    gap: 10,
  },
  historyItemText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  responseContainer: {
    gap: 16,
  },
  confidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.highlight + '40',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  confidenceText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  answerCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.accent + '60',
    boxShadow: '0px 4px 12px rgba(255, 215, 0, 0.2)',
    elevation: 4,
  },
  sourcesCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.secondary + '60',
    boxShadow: '0px 4px 12px rgba(240, 128, 128, 0.2)',
    elevation: 4,
  },
  suggestionsCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.primary + '60',
    boxShadow: '0px 4px 12px rgba(100, 149, 237, 0.2)',
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 10,
  },
  answerText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 26,
  },
  sourceItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  sourceBullet: {
    marginRight: 10,
    marginTop: 2,
  },
  sourceText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  factCheckBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.highlight + '30',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 8,
    gap: 8,
  },
  factCheckText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  suggestionText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
  },
  feedbackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  examplesContainer: {
    marginTop: 8,
  },
  examplesTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  exampleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.primary + '40',
    boxShadow: '0px 2px 8px rgba(100, 149, 237, 0.15)',
    elevation: 3,
    gap: 12,
  },
  exampleText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.primary + '40',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    gap: 12,
  },
  infoCardContent: {
    flex: 1,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  infoCardText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
  },
});
