import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import { useDispatch, useSelector } from 'react-redux';
import { CongratzProps } from 'WordPuzzle/@types/navigation';
import { useTheme } from 'WordPuzzle/src/hooks';
import { updatePoints, updateUser, UserState } from 'WordPuzzle/src/store/user';

const Congratz = ({ route, navigation }: CongratzProps) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector((state: { user: UserState }) => state.user);
  const [name, setName] = useState(user.name);
  const { points, category } = route.params;
  const { Layout, Fonts, Common, Gutters } = useTheme();
  const nameInputRef = useRef<TextInput>(null);
  const { t } = useTranslation('congratz');
  const viewShotRef = useRef<ViewShot>(null);

  useEffect(() => {
    dispatch(updatePoints({ points }));
  }, []);

  const onPressNext = useCallback(() => {
    if (name) {
      navigation.reset({
        index: 1,
        routes: [
          {
            name: 'Home',
          },
          {
            name: 'Game',
            params: { category },
          },
        ],
      });
    } else {
      setModalVisible(true);
    }
  }, [name]);

  const onPressShare = useCallback(async () => {
    const uri = await viewShotRef.current?.capture();
    Share.open({
      title: t('shareTitle', { points: user.points }),
      url: uri,
      type: 'image/jpeg',
    });
  }, [user]);

  //Modal to update name
  const renderModal = () => {
    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={[Layout.fill, Layout.colHCenter, Common.modalContainer]}>
          <View style={Common.modal}>
            <Text
              style={[Fonts.titleSmall, Fonts.textCenter, Gutters.tinyBMargin]}
            >
              {t('modalTitle')}
            </Text>
            <Text
              style={[Fonts.textRegular, Fonts.textCenter, Gutters.tinyBMargin]}
            >
              {t('modalDesc')}
            </Text>
            <TextInput
              style={[Common.textInput, Fonts.textCenter]}
              ref={nameInputRef}
              value={name || ''}
              onChangeText={setName}
            />
            <Pressable
              disabled={!name || name === ''}
              style={[Common.button.rounded, Gutters.tinyTMargin]}
              onPress={() => {
                console.log(name);
                dispatch(updateUser({ name }));
                setModalVisible(false);
              }}
            >
              <Text style={Fonts.textCenter}>{t('submit')}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={[Layout.fill, Layout.scrollSpaceAround]}>
      <ViewShot
        style={Layout.scrollSpaceAround}
        ref={viewShotRef}
        options={{ format: 'jpg', quality: 0.9 }}
      >
        <View>
          <Text style={[Fonts.titleRegular, Fonts.textCenter]}>
            {t('title', {
              points,
            })}
          </Text>
          <Text style={[Fonts.titleSmall, Fonts.textCenter]}>
            {t('desc', {
              points: user.points,
            })}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={[
              Common.button.rounded,
              Gutters.regularHMargin,
              Gutters.tinyBMargin,
            ]}
            onPress={onPressNext}
          >
            <Text style={Fonts.textCenter}>{t('next')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[Common.button.rounded, Gutters.regularHMargin]}
            onPress={onPressShare}
          >
            <Text style={Fonts.textCenter}>{t('share')}</Text>
          </TouchableOpacity>
        </View>
      </ViewShot>

      {renderModal()}
    </SafeAreaView>
  );
};

export default Congratz;
